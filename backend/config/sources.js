/**
 * RSS sources for Founder Intelligence, grouped by type.
 * Each source: { name, rss_url, category_bias? }
 * category_bias is optional hint for classification (funding | founder_stories | ai | scalable_business).
 */

// AI company & lab blogs (1–10, 37–40)
const AI_COMPANY_BLOGS = [
  { name: 'OpenAI Blog', rss_url: 'https://openai.com/blog/rss.xml', category_bias: 'ai' },
  { name: 'OpenAI Research', rss_url: 'https://openai.com/research/rss.xml', category_bias: 'ai' },
  { name: 'Google DeepMind Blog', rss_url: 'https://deepmind.google/blog/rss.xml', category_bias: 'ai' },
  { name: 'Google Research Blog', rss_url: 'https://research.google/blog/rss.xml', category_bias: 'ai' },
  { name: 'Anthropic Blog', rss_url: 'https://www.anthropic.com/news/rss', category_bias: 'ai' },
  { name: 'Meta AI Blog', rss_url: 'https://ai.meta.com/blog/feed/', category_bias: 'ai' },
  { name: 'Microsoft AI Blog', rss_url: 'https://blogs.microsoft.com/ai/feed/', category_bias: 'ai' },
  { name: 'NVIDIA Developer Blog', rss_url: 'https://developer.nvidia.com/blog/feed/', category_bias: 'ai' },
  { name: 'Hugging Face Blog', rss_url: 'https://huggingface.co/blog/feed.xml', category_bias: 'ai' },
  { name: 'Google AI Blog', rss_url: 'https://ai.googleblog.com/feeds/posts/default', category_bias: 'ai' },
  { name: 'Meta AI Research', rss_url: 'https://ai.facebook.com/blog/feed/', category_bias: 'ai' },
  { name: 'Apple ML Research', rss_url: 'https://machinelearning.apple.com/feed.xml', category_bias: 'ai' },
  { name: 'NVIDIA AI', rss_url: 'https://blogs.nvidia.com/feed/', category_bias: 'ai' },
];

// Tech & general news – AI sections (11–16, 20)
const TECH_NEWS_AI = [
  { name: 'MIT Technology Review (AI)', rss_url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category_bias: 'ai' },
  { name: 'TechCrunch AI', rss_url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category_bias: 'ai' },
  { name: 'The Verge AI', rss_url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', category_bias: 'ai' },
  { name: 'VentureBeat AI', rss_url: 'https://venturebeat.com/category/ai/feed/', category_bias: 'ai' },
  { name: 'Ars Technica', rss_url: 'https://feeds.arstechnica.com/arstechnica/index', category_bias: 'ai' },
  { name: 'Wired AI', rss_url: 'https://www.wired.com/feed/tag/ai/latest/', category_bias: 'ai' },
  { name: 'Bloomberg Technology', rss_url: 'https://feeds.bloomberg.com/markets/news.rss', category_bias: 'ai' },
  { name: 'Financial Times Tech', rss_url: 'https://www.ft.com/technology?format=rss', category_bias: 'ai' },
  { name: 'Forbes AI', rss_url: 'https://www.forbes.com/ai/feed/', category_bias: 'ai' },
  { name: 'Fast Company Tech', rss_url: 'https://www.fastcompany.com/technology/feed', category_bias: 'ai' },
];

// Newsletters & curated AI (21–25)
const NEWSLETTERS_CURATED = [
  { name: 'The Batch (DeepLearning.AI)', rss_url: 'https://www.deeplearning.ai/feed/', category_bias: 'ai' },
  { name: 'Import AI', rss_url: 'https://importai.substack.com/feed', category_bias: 'ai' },
  { name: "Ben's Bites", rss_url: 'https://www.bensbites.co/feed', category_bias: 'ai' },
  { name: 'The Rundown AI', rss_url: 'https://www.therundown.ai/feed', category_bias: 'ai' },
  { name: 'AI News', rss_url: 'https://www.artificialintelligence-news.com/feed/', category_bias: 'ai' },
];

// Research & education (26–32, 28–29)
const RESEARCH_EDUCATION = [
  { name: 'Towards Data Science', rss_url: 'https://towardsdatascience.com/feed', category_bias: 'ai' },
  { name: 'Machine Learning Mastery', rss_url: 'https://machinelearningmastery.com/feed/', category_bias: 'ai' },
  { name: 'BAIR Blog', rss_url: 'https://bair.berkeley.edu/blog/feed.xml', category_bias: 'ai' },
  { name: 'Distill', rss_url: 'https://distill.pub/rss.xml', category_bias: 'ai' },
  { name: 'Papers With Code', rss_url: 'https://paperswithcode.com/feed', category_bias: 'ai' },
  { name: 'arXiv CS AI', rss_url: 'https://rss.arxiv.org/rss/cs.AI', category_bias: 'ai' },
  { name: 'Stanford HAI', rss_url: 'https://hai.stanford.edu/news/feed', category_bias: 'ai' },
  { name: 'Allen Institute for AI', rss_url: 'https://allenai.org/feed.xml', category_bias: 'ai' },
  { name: 'DeepLearning.AI Blog', rss_url: 'https://www.deeplearning.ai/blog/feed/', category_bias: 'ai' },
  { name: 'EleutherAI', rss_url: 'https://blog.eleuther.ai/rss.xml', category_bias: 'ai' },
  { name: 'LAION', rss_url: 'https://laion.ai/feed/', category_bias: 'ai' },
];

// Analysis & VC / strategy (41–50)
const ANALYSIS_VC_STRATEGY = [
  { name: 'Stratechery', rss_url: 'https://stratechery.com/feed/', category_bias: 'scalable_business' },
  { name: 'a16z (AI)', rss_url: 'https://a16z.com/feed/', category_bias: 'ai' },
  { name: 'Sequoia Capital (AI)', rss_url: 'https://www.sequoiacap.com/feed/', category_bias: 'ai' },
  { name: 'CB Insights AI', rss_url: 'https://www.cbinsights.com/research/feed', category_bias: 'ai' },
  { name: 'McKinsey AI Insights', rss_url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/rss.xml', category_bias: 'ai' },
  { name: 'PwC AI', rss_url: 'https://www.pwc.com/gx/en/issues/artificial-intelligence/rss.xml', category_bias: 'ai' },
  { name: 'Accenture AI', rss_url: 'https://www.accenture.com/us-en/blogs/feed', category_bias: 'ai' },
  { name: 'Gartner AI', rss_url: 'https://www.gartner.com/en/topics/artificial-intelligence/rss', category_bias: 'ai' },
  { name: "O'Reilly AI/ML", rss_url: 'https://www.oreilly.com/radar/feed.rss', category_bias: 'ai' },
  { name: 'IEEE Spectrum AI', rss_url: 'https://spectrum.ieee.org/feeds/feed.rss', category_bias: 'ai' },
];

// The Information – often no public RSS; include common pattern if available
const ADDITIONAL = [
  { name: 'The Information', rss_url: 'https://www.theinformation.com/feed', category_bias: 'funding' },
];

// Startups, VC & tech business (user list – 50 sources)
const STARTUPS_VC_TECH = [
  { name: 'TechCrunch Startups', rss_url: 'https://techcrunch.com/category/startups/feed/', category_bias: 'funding' },
  { name: 'VentureBeat', rss_url: 'https://venturebeat.com/feed/', category_bias: 'funding' },
  { name: 'Crunchbase News', rss_url: 'https://news.crunchbase.com/feed/', category_bias: 'funding' },
  { name: 'The Information', rss_url: 'https://www.theinformation.com/feed', category_bias: 'funding' },
  { name: 'Bloomberg Technology', rss_url: 'https://feeds.bloomberg.com/markets/news.rss', category_bias: 'funding' },
  { name: 'Forbes Startups', rss_url: 'https://www.forbes.com/startups/feed/', category_bias: 'funding' },
  { name: 'Business Insider Startups', rss_url: 'https://www.businessinsider.com/startups/rss', category_bias: 'funding' },
  { name: 'Financial Times Tech', rss_url: 'https://www.ft.com/technology?format=rss', category_bias: 'funding' },
  { name: 'Wired Business', rss_url: 'https://www.wired.com/feed/category/business/latest/', category_bias: 'funding' },
  { name: 'The Verge Tech', rss_url: 'https://www.theverge.com/tech/rss/index.xml', category_bias: 'funding' },
  { name: 'Ars Technica', rss_url: 'https://feeds.arstechnica.com/arstechnica/index', category_bias: 'funding' },
  { name: 'Entrepreneur', rss_url: 'https://www.entrepreneur.com/latest/feed', category_bias: 'founder_stories' },
  { name: 'Inc Magazine', rss_url: 'https://www.inc.com/arc/outboundfeeds/rss/', category_bias: 'founder_stories' },
  { name: 'Fast Company', rss_url: 'https://www.fastcompany.com/feed', category_bias: 'funding' },
  { name: 'Hacker News', rss_url: 'https://hnrss.org/frontpage', category_bias: 'scalable_business' },
  { name: 'Product Hunt', rss_url: 'https://www.producthunt.com/feed', category_bias: 'scalable_business' },
  { name: 'Y Combinator Blog', rss_url: 'https://blog.ycombinator.com/feed/', category_bias: 'founder_stories' },
  { name: 'Y Combinator News', rss_url: 'https://hnrss.org/frontpage', category_bias: 'founder_stories' },
  { name: 'a16z Blog', rss_url: 'https://a16z.com/feed/', category_bias: 'funding' },
  { name: 'Sequoia Capital Blog', rss_url: 'https://www.sequoiacap.com/feed/', category_bias: 'funding' },
  { name: 'First Round Review', rss_url: 'https://review.firstround.com/rss', category_bias: 'founder_stories' },
  { name: 'Andreessen Horowitz Future', rss_url: 'https://future.com/feed/', category_bias: 'funding' },
  { name: 'CB Insights', rss_url: 'https://www.cbinsights.com/research/feed', category_bias: 'funding' },
  { name: 'PitchBook News', rss_url: 'https://pitchbook.com/news/rss', category_bias: 'funding' },
  { name: 'Sifted', rss_url: 'https://sifted.eu/feed/', category_bias: 'funding' },
  { name: 'SiliconANGLE', rss_url: 'https://siliconangle.com/feed/', category_bias: 'funding' },
  { name: 'Venture Capital Journal', rss_url: 'https://www.venturecapitaljournal.com/feed/', category_bias: 'funding' },
  { name: 'Startup Genome', rss_url: 'https://startupgenome.com/blog/feed', category_bias: 'founder_stories' },
  { name: 'DealStreetAsia', rss_url: 'https://www.dealstreetasia.com/feed/', category_bias: 'funding' },
  { name: 'YourStory', rss_url: 'https://yourstory.com/feed', category_bias: 'funding' },
  { name: 'Inc42', rss_url: 'https://inc42.com/feed/', category_bias: 'funding' },
  { name: 'Entrackr', rss_url: 'https://entrackr.com/feed/', category_bias: 'funding' },
  { name: 'Tech in Asia', rss_url: 'https://www.techinasia.com/feed', category_bias: 'funding' },
  { name: 'e27', rss_url: 'https://e27.co/feed/', category_bias: 'funding' },
  { name: 'Startup Grind', rss_url: 'https://www.startupgrind.com/blog/feed/', category_bias: 'founder_stories' },
  { name: 'SaaStr', rss_url: 'https://www.saastr.com/feed/', category_bias: 'scalable_business' },
  { name: 'SaaStr Daily', rss_url: 'https://www.saastr.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Stratechery', rss_url: 'https://stratechery.com/feed/', category_bias: 'scalable_business' },
  { name: 'Benedict Evans Blog', rss_url: 'https://www.ben-evans.com/feed', category_bias: 'scalable_business' },
  { name: 'Paul Graham Essays', rss_url: 'https://paulgraham.com/rss.html', category_bias: 'founder_stories' },
  { name: 'Tech.eu', rss_url: 'https://tech.eu/feed/', category_bias: 'funding' },
  { name: 'EU Startups', rss_url: 'https://www.eu-startups.com/feed/', category_bias: 'funding' },
  { name: 'Startup Daily', rss_url: 'https://www.startupdaily.net/feed/', category_bias: 'funding' },
  { name: 'AngelList Blog', rss_url: 'https://angel.co/blog/feed', category_bias: 'funding' },
  { name: 'NFX Blog', rss_url: 'https://www.nfx.com/post/feed/', category_bias: 'funding' },
  { name: 'Redpoint Ventures Blog', rss_url: 'https://www.redpoint.com/blog/feed/', category_bias: 'funding' },
  { name: 'Lightspeed Venture Partners Blog', rss_url: 'https://lsvp.com/blog/feed/', category_bias: 'funding' },
  { name: 'Battery Ventures Blog', rss_url: 'https://www.battery.com/blog/feed/', category_bias: 'funding' },
  { name: 'Not Boring', rss_url: 'https://www.notboring.co/feed', category_bias: 'scalable_business' },
  { name: 'The Generalist', rss_url: 'https://www.readthegeneralist.com/feed', category_bias: 'scalable_business' },
];

// Startup growth & scalable business (50 sources for "Building Scalable Businesses")
const STARTUP_GROWTH_SCALABLE = [
  { name: 'Recharge Blog', rss_url: 'https://rechargepayments.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'ProfitWell (Paddle)', rss_url: 'https://www.paddle.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'ChartMogul Blog', rss_url: 'https://chartmogul.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'OpenView Partners', rss_url: 'https://openviewpartners.com/feed/', category_bias: 'scalable_business' },
  { name: 'GrowthHackers', rss_url: 'https://growthhackers.com/feed', category_bias: 'scalable_business' },
  { name: 'Product-Led Growth Collective', rss_url: 'https://www.productled.org/feed', category_bias: 'scalable_business' },
  { name: "Lenny's Newsletter", rss_url: 'https://www.lennysnewsletter.com/feed', category_bias: 'scalable_business' },
  { name: 'Reforge Blog', rss_url: 'https://www.reforge.com/blog/feed', category_bias: 'scalable_business' },
  { name: 'Brian Balfour (Coelevate)', rss_url: 'https://brianbalfour.com/feed', category_bias: 'scalable_business' },
  { name: 'Andrew Chen', rss_url: 'https://andrewchen.com/feed/', category_bias: 'scalable_business' },
  { name: 'Casey Accidental', rss_url: 'https://caseyaccidental.com/feed/', category_bias: 'scalable_business' },
  { name: 'Indie Hackers', rss_url: 'https://www.indiehackers.com/feed', category_bias: 'scalable_business' },
  { name: 'MicroConf', rss_url: 'https://microconf.com/feed/', category_bias: 'scalable_business' },
  { name: 'Bootstrapped Web', rss_url: 'https://bootstrapped.web/feed/', category_bias: 'scalable_business' },
  { name: 'Flippa Blog', rss_url: 'https://www.flippa.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Tiny Capital', rss_url: 'https://tinycapital.com/feed/', category_bias: 'scalable_business' },
  { name: 'Signal v. Noise (Basecamp)', rss_url: 'https://signalvnoise.com/feed', category_bias: 'scalable_business' },
  { name: 'Jason Cohen (Smart Bear)', rss_url: 'https://longform.asmartbear.com/feed', category_bias: 'scalable_business' },
  { name: 'Patrick McKenzie (Kalzumeus)', rss_url: 'https://www.kalzumeus.com/feed/', category_bias: 'scalable_business' },
  { name: 'Sam Altman Blog', rss_url: 'https://blog.samaltman.com/feed', category_bias: 'scalable_business' },
  { name: "Founder's Journey (AppSumo)", rss_url: 'https://blog.appsumo.com/feed/', category_bias: 'scalable_business' },
  { name: 'SaaSOptics Blog', rss_url: 'https://www.saasoptics.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Churn Buster', rss_url: 'https://churnbuster.io/blog/feed', category_bias: 'scalable_business' },
  { name: 'Baremetrics Blog', rss_url: 'https://baremetrics.com/blog/feed', category_bias: 'scalable_business' },
  { name: 'Price Intelligently', rss_url: 'https://www.priceintelligently.com/blog/feed', category_bias: 'scalable_business' },
  { name: 'Intercom Blog', rss_url: 'https://www.intercom.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'HubSpot Startup Blog', rss_url: 'https://blog.hubspot.com/startups/feed', category_bias: 'scalable_business' },
  { name: 'Zapier Blog', rss_url: 'https://zapier.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Buffer Blog', rss_url: 'https://buffer.com/resources/feed/', category_bias: 'scalable_business' },
  { name: 'Help Scout Blog', rss_url: 'https://www.helpscout.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Close Blog', rss_url: 'https://blog.close.com/feed/', category_bias: 'scalable_business' },
  { name: 'Gong Blog', rss_url: 'https://www.gong.io/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Drift Blog', rss_url: 'https://www.drift.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Version One Ventures', rss_url: 'https://versionone.vc/feed/', category_bias: 'scalable_business' },
  { name: 'Point Nine Blog', rss_url: 'https://www.pointnine.com/feed/', category_bias: 'scalable_business' },
  { name: 'Creandum Blog', rss_url: 'https://www.creandum.com/feed/', category_bias: 'scalable_business' },
  { name: 'Index Ventures', rss_url: 'https://indexventures.com/news/feed', category_bias: 'scalable_business' },
  { name: 'Bessemer Venture Partners', rss_url: 'https://www.bvp.com/feed/', category_bias: 'scalable_business' },
  { name: 'Emergence Capital', rss_url: 'https://www.emcap.com/feed/', category_bias: 'scalable_business' },
  { name: 'Heavybit', rss_url: 'https://www.heavybit.com/blog/feed/', category_bias: 'scalable_business' },
  { name: 'Elad Blog (High Growth Handbook)', rss_url: 'https://blog.eladgil.com/feed', category_bias: 'scalable_business' },
  { name: 'Both Sides of the Table (Mark Suster)', rss_url: 'https://bothsidesofthetable.com/feed/', category_bias: 'scalable_business' },
  { name: 'Feld Thoughts (Brad Feld)', rss_url: 'https://feld.com/feed/', category_bias: 'scalable_business' },
  { name: 'AVC (Fred Wilson)', rss_url: 'https://avc.com/feed/', category_bias: 'scalable_business' },
  { name: '20VC', rss_url: 'https://www.thetwentyminutevc.com/feed', category_bias: 'scalable_business' },
  { name: 'Harvard Business Review Startups', rss_url: 'https://hbr.org/topic/subject/startups/feed', category_bias: 'scalable_business' },
  { name: 'Greylock Blog', rss_url: 'https://greylock.com/feed/', category_bias: 'scalable_business' },
  { name: 'Accel Blog', rss_url: 'https://www.accel.com/feed/', category_bias: 'scalable_business' },
  { name: 'Union Square Ventures', rss_url: 'https://www.usv.com/blog/feed', category_bias: 'scalable_business' },
  { name: 'For Entrepreneurs (David Skok)', rss_url: 'https://www.forentrepreneurs.com/feed/', category_bias: 'scalable_business' },
];

export const SOURCES = [
  ...AI_COMPANY_BLOGS,
  ...TECH_NEWS_AI,
  ...NEWSLETTERS_CURATED,
  ...RESEARCH_EDUCATION,
  ...ANALYSIS_VC_STRATEGY,
  ...ADDITIONAL,
  ...STARTUPS_VC_TECH,
  ...STARTUP_GROWTH_SCALABLE,
];
