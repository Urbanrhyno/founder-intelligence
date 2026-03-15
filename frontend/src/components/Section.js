export function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold text-white border-l-4 border-alpine-600 pl-3 mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
