import { SOURCE_CREDIBILITY } from '../config/feeds.js';

const RECENCY_HALFLIFE_DAYS = 7; // score halves every 7 days
const KEYWORD_WEIGHT = 0.2;
const FOUNDER_KEYWORDS = [
  'startup', 'founder', 'funding', 'raise', 'series', 'seed', 'vc', 'venture',
  'growth', 'scale', 'revenue', 'ARR', 'MRR', 'product-market fit', 'PMF',
  'y combinator', 'accelerator', 'pivot', 'bootstrapped', 'exit', 'acquisition',
  'ai', 'machine learning', 'automation', 'saas', 'b2b', 'b2c',
];

/**
 * Recency score: 1 at now, decays exponentially by age.
 */
function recencyScore(publishedAt) {
  const now = Date.now();
  const ageDays = (now - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24);
  return Math.pow(0.5, ageDays / RECENCY_HALFLIFE_DAYS);
}

/**
 * Keyword relevance: fraction of founder keywords found in title (case-insensitive).
 */
function keywordScore(title) {
  const lower = (title || '').toLowerCase();
  const found = FOUNDER_KEYWORDS.filter((kw) => lower.includes(kw)).length;
  return Math.min(1, (found / 3)); // cap at 1, 3+ matches = full score
}

/**
 * Combined score: credibility (0.4), recency (0.4), keywords (0.2).
 * Normalized to 0–10 for storage.
 */
export function computeScore(article) {
  const credibility = SOURCE_CREDIBILITY[article.source] ?? 0.5;
  const recency = recencyScore(article.publishedAt);
  const keywords = keywordScore(article.title);
  const raw = 0.4 * credibility + 0.4 * recency + KEYWORD_WEIGHT * (1 + keywords);
  return Math.round(raw * 10 * 100) / 100; // 0–10, 2 decimals
}
