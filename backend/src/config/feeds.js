/**
 * RSS feed sources for Founder Intelligence.
 * Source names are used for credibility scoring.
 */
export const RSS_FEEDS = [
  { url: 'https://techcrunch.com/feed/', name: 'TechCrunch' },
  { url: 'https://venturebeat.com/feed/', name: 'VentureBeat' },
  { url: 'https://www.technologyreview.com/feed/', name: 'MIT Technology Review' },
  { url: 'https://review.firstround.com/rss', name: 'First Round Review' },
  { url: 'https://blog.ycombinator.com/feed/', name: 'Y Combinator Blog' },
  { url: 'https://feeds.hbr.org/harvardbusiness', name: 'Harvard Business Review' },
  { url: 'https://www.indiehackers.com/feed', name: 'Indie Hackers' },
];

/** Credibility weight by source (0–1). Used in scoring. */
export const SOURCE_CREDIBILITY = {
  'TechCrunch': 0.95,
  'VentureBeat': 0.85,
  'MIT Technology Review': 0.95,
  'First Round Review': 0.9,
  'Y Combinator Blog': 0.95,
  'Harvard Business Review': 0.95,
  'Indie Hackers': 0.8,
};

export const CATEGORIES = ['funding', 'founder_stories', 'ai', 'scalable_business'];
