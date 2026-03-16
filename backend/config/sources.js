/**
 * RSS sources for Founder Intelligence, grouped by type.
 * Each source: { name, rss_url, category_bias? }
 * category_bias is optional hint for classification (funding | founder_stories | ai | scalable_business).
 */

// Startup & tech news
const STARTUP_TECH = [
  { name: 'TechCrunch', rss_url: 'https://techcrunch.com/feed/', category_bias: 'funding' },
  { name: 'Crunchbase News', rss_url: 'https://news.crunchbase.com/feed/', category_bias: 'funding' },
  { name: 'VentureBeat', rss_url: 'https://venturebeat.com/feed/', category_bias: 'ai' },
  { name: 'MIT Technology Review', rss_url: 'https://www.technologyreview.com/feed/', category_bias: 'ai' },
  { name: 'Hacker News', rss_url: 'https://hnrss.org/frontpage', category_bias: 'scalable_business' },
  { name: 'Product Hunt', rss_url: 'https://www.producthunt.com/feed', category_bias: 'scalable_business' },
];

// AI company blogs
const AI_BLOGS = [
  { name: 'OpenAI Blog', rss_url: 'https://openai.com/blog/rss.xml', category_bias: 'ai' },
  { name: 'Google DeepMind Blog', rss_url: 'https://deepmind.google/blog/rss.xml', category_bias: 'ai' },
];

// VC & accelerator blogs
const VC_BLOGS = [
  { name: 'Y Combinator Blog', rss_url: 'https://blog.ycombinator.com/feed/', category_bias: 'founder_stories' },
  { name: 'Sequoia Capital Blog', rss_url: 'https://www.sequoiacap.com/feed/', category_bias: 'funding' },
];

// Analysis & newsletters (RSS where available)
const ANALYSIS = [
  { name: 'Stratechery', rss_url: 'https://stratechery.com/feed/', category_bias: 'scalable_business' },
];

// AI research & news
const AI_RESEARCH = [
  { name: 'arXiv CS AI', rss_url: 'https://rss.arxiv.org/rss/cs.AI', category_bias: 'ai' },
  { name: 'MIT Tech Review AI', rss_url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category_bias: 'ai' },
];

export const SOURCES = [
  ...STARTUP_TECH,
  ...AI_BLOGS,
  ...VC_BLOGS,
  ...ANALYSIS,
  ...AI_RESEARCH,
];
