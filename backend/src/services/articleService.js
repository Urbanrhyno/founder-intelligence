import { prisma } from '../lib/prisma.js';
import { fetchAllFeeds } from '../scrapers/rssFetcher.js';
import { deduplicate } from './deduplicate.js';
import { classifyArticle, generateSummary } from './openaiService.js';
import { computeScore } from './scoring.js';
import { RSS_FEEDS } from '../config/feeds.js';

/**
 * Get existing URLs from DB for the given list (to skip duplicates).
 */
export async function getExistingUrls(urls) {
  if (!urls.length) return new Set();
  const lower = urls.map((u) => u.toLowerCase().trim());
  const found = await prisma.article.findMany({
    where: { url: { in: lower } },
    select: { url: true },
  });
  return new Set(found.map((f) => f.url));
}

/**
 * Filter out items whose URL already exists in DB.
 */
export async function filterExisting(items) {
  const urls = items.map((i) => i.url);
  const existing = await getExistingUrls(urls);
  return items.filter((i) => !existing.has(i.url.toLowerCase().trim())); // URLs stored lowercased
}

/**
 * Process one article: classify, summarize, score, and save.
 */
async function processOne(raw) {
  const [category, summary] = await Promise.all([
    classifyArticle(raw.title),
    generateSummary(raw.title),
  ]);
  const score = computeScore({ ...raw, category });
  await prisma.article.create({
    data: {
      title: raw.title,
      url: raw.url.toLowerCase().trim(),
      source: raw.source,
      category,
      summary,
      score,
      publishedAt: raw.publishedAt,
    },
  });
}

/**
 * Full pipeline: fetch RSS → dedupe → filter existing → AI + score → save.
 */
export async function runIngestion() {
  const fetched = await fetchAllFeeds(RSS_FEEDS);
  const deduped = deduplicate(fetched);
  const newItems = await filterExisting(deduped);

  let saved = 0;
  for (const item of newItems) {
    try {
      await processOne(item);
      saved++;
    } catch (err) {
      console.error('[Ingestion] Failed to save:', item.url, err.message);
    }
  }
  return { fetched: fetched.length, deduped: deduped.length, new: newItems.length, saved };
}

/**
 * Get top 5 articles by category, ordered by score desc.
 */
export async function getTopArticlesByCategory(category, limit = 5) {
  return prisma.article.findMany({
    where: category ? { category } : undefined,
    orderBy: { score: 'desc' },
    take: limit,
  });
}
