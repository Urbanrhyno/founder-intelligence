export function ArticleCard({ article }) {
  if (!article) return null;
  const title = article.title ?? 'Untitled';
  const url = article.url ?? '#';
  const summary = article.summary ?? '';
  const source = article.source ?? 'Unknown';

  return (
    <article className="rounded-lg border border-teal/30 bg-teal/5 p-6 transition hover:border-alpine/50 hover:bg-teal/10">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs uppercase tracking-wider text-neutral-500 shrink-0">
          {source}
        </span>
      </div>
      <h3 className="font-heading mt-2 text-xl font-bold text-white leading-snug">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-alpine transition"
        >
          {title}
        </a>
      </h3>
      {summary ? (
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">
          {summary}
        </p>
      ) : null}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-medium text-alpine hover:text-white transition underline underline-offset-2"
      >
        Read more
      </a>
    </article>
  );
}
