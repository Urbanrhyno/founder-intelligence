export function Section({ title, subtitle, children }) {
  return (
    <section className="mb-16">
      <div className="border-b border-teal/30 pb-3 mb-8">
        <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
