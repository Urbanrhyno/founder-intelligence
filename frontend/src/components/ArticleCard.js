export function ArticleCard({ article }) {
  if (!article) return null;
  const title = article.title ?? 'Untitled';
  const url = article.url ?? '#';
  const summary = article.summary ?? '';
  const source = article.source ?? 'Unknown';

  return (
    <article className="rounded-lg border border-teal/30 bg-teal/5 p-5 transition hover:border-alpine/50 hover:bg-teal/10 space-y-3">
      <h3 className="font-semibold text-lg text-white leading-snug">
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
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
          {summary}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="text-xs text-neutral-500">{source}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-alpine hover:text-white transition"
        >
          Read article →
        </a>
      </div>
    </article>
  );
}
