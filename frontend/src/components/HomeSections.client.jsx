'use client';

import { useCallback, useState } from 'react';
import { useArticlesUpdates } from '@/src/hooks/useArticlesUpdates';
import { supabase } from '@/src/lib/supabase';
import { Section } from '@/src/components/Section';
import { ArticleCard } from '@/src/components/ArticleCard';

const CATEGORY_KEYS = ['funding', 'founder_stories', 'ai', 'scalable_business'];

async function fetchAllArticlesForHomeClient(limitPerCategory = 5) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .gte('published_at', twentyFourHoursAgo)
    .not('score', 'is', null)
    .order('score', { ascending: false })
    .order('published_at', { ascending: false });

  if (error) {
    console.error(error);
    return {
      funding: [],
      founder_stories: [],
      ai: [],
      scalable_business: [],
    };
  }

  const byCategory = {
    funding: [],
    founder_stories: [],
    ai: [],
    scalable_business: [],
  };

  for (const article of data || []) {
    const cat = CATEGORY_KEYS.includes(article.category) ? article.category : null;
    if (!cat) continue;
    if (byCategory[cat].length < limitPerCategory) {
      byCategory[cat].push(article);
    }
  }

  return byCategory;
}

const SECTIONS = [
  { category: 'funding', title: 'Startup Funding & Exits' },
  { category: 'founder_stories', title: 'Founder Growth Stories' },
  { category: 'ai', title: 'AI Innovations' },
  { category: 'scalable_business', title: 'Building Scalable Businesses' },
];

export function HomeSectionsClient({ initialByCategory }) {
  const [byCategory, setByCategory] = useState(initialByCategory);

  const refresh = useCallback(async () => {
    const fresh = await fetchAllArticlesForHomeClient(5);
    setByCategory(fresh);
  }, []);

  useArticlesUpdates(refresh);

  const sectionsWithArticles = SECTIONS.map(({ category, title }) => ({
    category,
    title,
    articles: Array.isArray(byCategory?.[category]) ? byCategory[category] : [],
  }));

  const fundingArticles = sectionsWithArticles[0]?.articles ?? [];
  const featuredArticle = fundingArticles.length > 0 ? fundingArticles[0] : null;
  const firstSectionArticles = featuredArticle ? fundingArticles.slice(1) : fundingArticles;

  return (
    <>
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
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span className="font-semibold text-white">
                    {featuredArticle.source ?? 'Unknown'}
                  </span>
                  {featuredArticle.published_at && (
                    <span className="font-semibold text-white">
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
                <span className="text-xs sm:text-sm font-semibold text-alpine hover:text-white transition underline underline-offset-2">
                  Read more
                </span>
              </div>
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
    </>
  );
}

