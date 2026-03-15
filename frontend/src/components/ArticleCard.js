export function ArticleCard({ article }) {
  if (!article) return null;
  const title = article.title ?? 'Untitled';
  const url = article.url ?? '#';
  const summary = article.summary ?? '';
  const source = article.source ?? 'Unknown';

  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition hover:border-neutral-700">
      <h3 className="font-medium text-white">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          {title}
        </a>
      </h3>
      {summary ? (
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          {summary}
        </p>
      ) : null}
      <p className="mt-2 text-xs text-neutral-500">
        <span className="text-neutral-400">{source}</span>
        {' · '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-500"
        >
          Read →
        </a>
      </p>
    </article>
  );
}
