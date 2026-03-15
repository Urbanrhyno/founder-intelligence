process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import { processArticle } from "../services/aiProcessor.js"
import 'dotenv/config'
import Parser from "rss-parser"
import pkg from "pg"

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'FounderIntelligence/1.0' },
});

const FEEDS = [

    {
      name: "TechCrunch Startups",
      url: "https://techcrunch.com/tag/startups/feed/"
    },
  
    {
      name: "VentureBeat AI",
      url: "https://venturebeat.com/category/ai/feed/"
    },
  
    {
      name: "YCombinator",
      url: "https://www.ycombinator.com/blog/rss"
    },
  
    {
      name: "MIT Tech Review AI",
      url: "https://www.technologyreview.com/topic/artificial-intelligence/feed/"
    },
  
    {
      name: "Crunchbase News",
      url: "https://news.crunchbase.com/feed/"
    }
  
  
];

/**
 * Fetch all feeds, extract articles, insert into DB (skip duplicates by URL).
 * Export so it can be triggered manually.
 */
export async function fetchFeeds() {
  console.log('Fetching feeds...');

  const allItems = [];

  for (const feed of FEEDS) {
    try {
      const result = await parser.parseURL(feed.url);
      const items = (result.items || []).map((item) => {
        const link = (item.link || item.guid || '').trim();
        let publishedAt = new Date();
        if (item.pubDate) {
          const d = new Date(item.pubDate);
          if (!Number.isNaN(d.getTime())) publishedAt = d;
        }
        const description = (item.content || item.contentSnippet || item.summary || item.description || '').trim();
        return {
          title: (item.title || '').trim(),
          link,
          source: feed.name,
          publishedDate: publishedAt,
          description: description.slice(0, 2000) || null,
        };
      });
      allItems.push(...items.filter((i) => i.title && i.link));
    } catch (err) {
      console.error(`Failed to fetch ${feed.name}:`, err.message);
    }
  }

  console.log(`Number of articles found: ${allItems.length}`);

  let inserted = 0;
  for (const item of allItems) {
    const title = item.title
    const url = item.link
    const description = item.contentSnippet || item.content || ""
    const publishedAt = item.publishedDate
    const source = item.source || "Unknown"
    
    const ai = await processArticle(title, description)
    
    console.log("AI category:", ai.category)
    try {
      const result = await pool.query(
        `INSERT INTO articles (title, url, source, published_at, category, summary)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (url) DO NOTHING`,
         [title, url, source, publishedAt, ai.category, ai.summary]
      );
      inserted += result.rowCount ?? 0;
    } catch (e) {
      throw e;
    }
  }

  console.log(`Number of articles inserted: ${inserted}`);
  return { found: allItems.length, inserted };
}

const isMain = process.argv[1]?.endsWith('fetchFeeds.js');
if (isMain) {
  fetchFeeds()
    .then(() => pool.end())
    .catch((e) => {
      console.error(e);
      pool.end();
      process.exit(1);
    });
}
