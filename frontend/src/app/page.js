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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 py-6">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Founder <span className="text-red-600">Intelligence</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Curated insights for startup founders
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        {sectionsWithArticles.map(({ category, title, articles }) => (
          <Section key={category} title={title}>
            {articles.length === 0 ? (
              <p className="text-neutral-500 text-sm">No articles yet. Run the backend cron to ingest.</p>
            ) : (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </Section>
        ))}
      </main>

      <footer className="border-t border-neutral-800 py-6 mt-12">
        <div className="mx-auto max-w-4xl px-4 text-center text-neutral-500 text-sm">
          Founder Intelligence — Refreshed every 2 hours
        </div>
      </footer>
    </div>
  );
}
