import Link from "next/link";
import { SearchBar } from "./SearchBar";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
            Coupon Now
          </Link>
          <nav aria-label="Primary" className="hidden gap-4 text-sm text-zinc-600 md:flex">
            <Link href="/about" className="hover:text-zinc-900">
              About
            </Link>
            <Link href="/contact" className="hover:text-zinc-900">
              Contact
            </Link>
          </nav>
        </div>
        <div className="w-full md:max-w-md">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
