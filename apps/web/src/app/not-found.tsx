import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-zinc-900">Page not found</h1>
      <p className="mt-4 text-zinc-600">The page you requested does not exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Back to homepage
      </Link>
    </div>
  );
}
