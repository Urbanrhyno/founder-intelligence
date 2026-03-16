export function ArticleCard({ article }) {
  if (!article) return null;
  const title = article.title ?? 'Untitled';
  const url = article.url ?? '#';
  const summary = article.summary ?? '';
  const source = article.source ?? 'Unknown';

  const publishedAtRaw = article.published_at ?? article.publishedAt ?? null;
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;
  const isValidDate = publishedAt && !Number.isNaN(publishedAt.getTime());
  let publishedLabel = '';

  if (isValidDate) {
    const day = String(publishedAt.getDate()).padStart(2, '0');
    const month = String(publishedAt.getMonth() + 1).padStart(2, '0');
    const year = String(publishedAt.getFullYear()).slice(-2);
    publishedLabel = `${day}/${month}/${year}`;
  }

  return (
    <article className="rounded-lg border border-teal/30 bg-teal/5 p-6 transition hover:border-alpine/50 hover:bg-teal/10">
      <h3 className="font-heading text-xl font-bold text-white leading-snug">
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

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="font-semibold text-white">{source}</span>
          {publishedLabel ? (
            <span className="font-semibold text-white">{publishedLabel}</span>
          ) : null}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-semibold text-alpine hover:text-white transition underline underline-offset-2"
        >
          Read more
        </a>
      </div>
    </article>
  );
}
