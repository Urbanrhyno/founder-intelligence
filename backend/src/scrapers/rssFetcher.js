import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'FounderIntelligence/1.0' },
});

/**
 * Fetch all items from a single RSS feed.
 * @param {{ url: string, name: string }} feed
 * @returns {Promise<Array<{ title: string, url: string, source: string, publishedAt: Date }>>}
 */
export async function fetchFeed(feed) {
  try {
    const result = await parser.parseURL(feed.url);
    const items = (result.items || []).map((item) => {
      const link = item.link || item.guid || '';
      let publishedAt = new Date();
      if (item.pubDate) {
        const d = new Date(item.pubDate);
        if (!Number.isNaN(d.getTime())) publishedAt = d;
      }
      return {
        title: (item.title || '').trim(),
        url: link.trim(),
        source: feed.name,
        publishedAt,
      };
    });
    return items.filter((i) => i.title && i.url);
  } catch (err) {
    console.error(`[RSS] Failed to fetch ${feed.name}:`, err.message);
    return [];
  }
}

/**
 * Fetch all configured RSS feeds and return flattened array of articles.
 */
export async function fetchAllFeeds(feeds) {
  const results = await Promise.allSettled(feeds.map((f) => fetchFeed(f)));
  const items = [];
  for (const r of results) {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      items.push(...r.value);
    }
  }
  return items;
}
