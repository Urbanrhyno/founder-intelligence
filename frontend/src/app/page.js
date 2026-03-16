import { fetchArticles } from '@/src/lib/api';
import { ArticleCard } from '@/src/components/ArticleCard';
import { Section } from '@/src/components/Section';

const SECTIONS = [
  { category: 'funding', title: 'Startup Funding & Exits' },
  { category: 'founder_stories', title: 'Founder Growth Stories' },
  { category: 'ai', title: 'AI Innovations' },
  { category: 'scalable_business', title: 'Building Scalable Businesses' },
];

export default async function HomePage() {
  let sectionsWithArticles;
  try {
    sectionsWithArticles = await Promise.all(
      SECTIONS.map(async ({ category, title }) => {
        const articles = await fetchArticles(category, 5);
        return { category, title, articles: Array.isArray(articles) ? articles : [] };
      })
    );
  } catch {
    sectionsWithArticles = SECTIONS.map(({ category, title }) => ({ category, title, articles: [] }));
  }

  const featuredArticle = sectionsWithArticles[0]?.articles?.length > 0
    ? sectionsWithArticles[0].articles[0]
    : null;
  const firstSectionArticles = featuredArticle
    ? sectionsWithArticles[0].articles.slice(1)
    : (sectionsWithArticles[0]?.articles ?? []);

  return (
    <div className="min-h-screen bg-obsidian text-brandwhite font-sans">
      <div className="mx-auto max-w-5xl border-x border-white/10">
        <header className="border-b border-teal/40">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Intelligence
              <br />
              <span className="text-alpine">for founders</span>
            </h1>
            <p className="mt-5 text-lg text-neutral-400 max-w-2xl">
              High-signal startup, AI, and funding news—refreshed for you four times daily.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-12">
          {featuredArticle && (
            <section className="mb-16">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Top story</p>
              <a
                href={featuredArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-teal/30 bg-teal/5 p-6 md:p-8 transition hover:border-alpine/50 hover:bg-teal/10"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-snug hover:text-alpine transition">
                  {featuredArticle.title ?? 'Untitled'}
                </h2>
                {featuredArticle.summary && (
                  <p className="mt-3 text-neutral-400 leading-relaxed line-clamp-2">
                    {featuredArticle.summary}
                  </p>
                )}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500">
                  <span>{featuredArticle.source ?? 'Unknown'}</span>
                  {featuredArticle.published_at && (
                    <span>
                      {(() => {
                        const d = new Date(featuredArticle.published_at);
                        if (Number.isNaN(d.getTime())) return null;
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = String(d.getFullYear()).slice(-2);
                        return `${day}/${month}/${year}`;
                      })()}
                    </span>
                  )}
                </div>
                <span className="mt-3 inline-block text-sm font-medium text-alpine hover:text-white transition underline underline-offset-2">
                  Read more
                </span>
              </a>
            </section>
          )}

          {sectionsWithArticles.map(({ category, title }, index) => {
            const articles = index === 0 ? firstSectionArticles : sectionsWithArticles[index].articles;
            return (
              <Section key={category} title={title} subtitle={index === 0 ? 'Latest in funding & exits' : undefined}>
                {articles.length === 0 ? (
                  <p className="text-neutral-500 text-sm">No articles yet. Run the backend cron to ingest.</p>
                ) : (
                  articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                )}
              </Section>
            );
          })}
        </main>

        <footer className="border-t border-teal/40 py-8 mt-16">
          <div className="mx-auto max-w-4xl px-4 text-center text-neutral-500 text-sm">
            <span className="text-alpine font-medium">Founder Intelligence</span>
            {' — '}
            Curated for founders. Refreshed 4 times daily.
          </div>
          <div className="mx-auto max-w-4xl px-4 mt-3 text-center text-neutral-500 text-xs sm:text-sm">
            <a
              href="https://www.gorkhaventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-alpine hover:text-white transition underline underline-offset-2"
            >
              www.gorkhaventures.com
            </a>
            <span className="mx-2">·</span>
            <a
              href="mailto:saurabh@gorkhaventures.com"
              className="text-alpine hover:text-white transition underline underline-offset-2"
            >
              saurabh@gorkhaventures.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
