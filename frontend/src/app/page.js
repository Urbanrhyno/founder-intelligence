import { fetchAllArticlesForHome } from '@/src/lib/api';
import { HomeSectionsClient } from '@/src/components/HomeSections.client';

export default async function HomePage() {
  let byCategory;
  try {
    byCategory = await fetchAllArticlesForHome(5);
  } catch {
    byCategory = {
      funding: [],
      founder_stories: [],
      ai: [],
      scalable_business: [],
    };
  }

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

        <HomeSectionsClient initialByCategory={byCategory} />

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
