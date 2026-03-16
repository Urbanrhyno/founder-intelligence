'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-xl font-semibold text-alpine mb-2">Something went wrong</h2>
      <p className="text-neutral-400 text-sm mb-4 text-center max-w-md">
        {error?.message || 'An error occurred loading the page.'}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded bg-teal text-white text-sm hover:bg-alpine transition"
      >
        Try again
      </button>
    </div>
  );
}
