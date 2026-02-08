import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <p className="text-text-muted text-sm mb-4">404</p>
      <h1 className="text-2xl font-medium">Page not found</h1>
      <p className="mt-4 text-text-secondary">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-accent hover:underline"
      >
        ← Home
      </Link>
    </div>
  );
}
