export const GNEWS_CONFIG = {
  apiKey: process.env.GNEWS_API_KEY,
  baseUrl: 'https://gnews.io/api/v4',
  language: process.env.GNEWS_LANG || 'en',
  country: process.env.GNEWS_COUNTRY || 'us', // e.g. 'us' or 'in'
  topics: (process.env.GNEWS_TOPICS || 'business,technology')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean),
};

