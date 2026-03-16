import 'dotenv/config';
import { GNEWS_CONFIG } from '../config/gnews.js';
import { processArticlesBatch } from '../services/aiProcessor.js';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const BATCH_SIZE = 10;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

/**
 * Fetch recent articles from GNews based on configured topics.
 * This is an experimental additive source; RSS ingestion remains the primary path.
 */
export async function fetchGNewsArticles() {
  if (!GNEWS_CONFIG.apiKey) {
    console.log('[GNews] GNEWS_API_KEY not set, skipping GNews ingestion.');
    return { fetched: 0, recent: 0, inserted: 0 };
  }

  console.log('[GNews] Fetching GNews articles...');

  const { baseUrl, language, country, topics, apiKey } = GNEWS_CONFIG;
  const allItems = [];

  for (const topic of topics) {
    const url = new URL(`${baseUrl}/top-headlines`);
    url.searchParams.set('category', topic);
    url.searchParams.set('lang', language);
    url.searchParams.set('country', country);
    url.searchParams.set('max', '100');
    url.searchParams.set('token', apiKey);

    try {
      const res = await fetch(url.toString());
      if (!res.ok) {
        console.error('[GNews] Failed to fetch topic', topic, res.status, res.statusText);
        continue;
      }
      const json = await res.json();
      const articles = Array.isArray(json.articles) ? json.articles : [];
      for (const a of articles) {
        const link = (a.url || '').trim();
        if (!link) continue;
        let publishedAt = new Date();
        if (a.publishedAt) {
          const d = new Date(a.publishedAt);
          if (!Number.isNaN(d.getTime())) publishedAt = d;
        }
        allItems.push({
          title: (a.title || '').trim(),
          link,
          source: a.source?.name || 'GNews',
          publishedDate: publishedAt,
          description: (a.description || a.content || '').trim().slice(0, 2000) || null,
          category_bias: 'scalable_business',
        });
      }
    } catch (err) {
      console.error('[GNews] Error fetching topic', topic, err.message);
    }
  }

  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const recentItems = allItems.filter((i) => i.publishedDate.getTime() >= cutoff);
  console.log(`[GNews] Articles found: ${allItems.length}, within last 24h: ${recentItems.length}`);

  let inserted = 0;
  const batches = chunk(recentItems, BATCH_SIZE);

  for (const batch of batches) {
    let results;
    try {
      results = await processArticlesBatch(
        batch.map((item) => ({
          title: item.title,
          description: item.description || '',
          source: item.source,
          publishedAt: item.publishedDate,
          category_bias: item.category_bias,
        }))
      );
    } catch (err) {
      console.error('[GNews] Batch AI processing failed:', err.message);
      continue;
    }

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i];
      const ai = results[i];
      const title = item.title;
      const url = item.link;
      const source = `GNews: ${item.source || 'Unknown'}`;
      const publishedAt = item.publishedDate;
      const score = ai != null && typeof ai.score === 'number' ? ai.score : 50;
      try {
        const result = await pool.query(
          `INSERT INTO articles (title, url, source, published_at, category, summary, score)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (url) DO NOTHING`,
          [title, url, source, publishedAt, ai.category, ai.summary, score]
        );
        inserted += result.rowCount ?? 0;
      } catch (e) {
        console.error('[GNews] Insert failed:', url, e.message);
      }
    }
  }

  console.log(`[GNews] Articles inserted: ${inserted}`);
  return { fetched: allItems.length, recent: recentItems.length, inserted };
}

