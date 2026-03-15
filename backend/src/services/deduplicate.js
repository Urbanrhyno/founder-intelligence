import stringSimilarity from 'string-similarity';

const TITLE_SIMILARITY_THRESHOLD = 0.85;

/**
 * Deduplicate by URL: keep first occurrence.
 */
function byUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.url.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Deduplicate by title similarity against existing titles.
 */
function byTitleSimilarity(items) {
  if (items.length <= 1) return items;
  const kept = [items[0]];
  for (let i = 1; i < items.length; i++) {
    const current = items[i];
    const existingTitles = kept.map((k) => k.title);
    const matches = stringSimilarity.findBestMatch(current.title, existingTitles);
    if (matches.bestMatch.rating < TITLE_SIMILARITY_THRESHOLD) {
      kept.push(current);
    }
  }
  return kept;
}

/**
 * Deduplicate: first by URL, then by title similarity.
 */
export function deduplicate(items) {
  return byTitleSimilarity(byUrl(items));
}
