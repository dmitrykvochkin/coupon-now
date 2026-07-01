import Link from "next/link";
import { SearchBar } from "./SearchBar";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Coupon Now
          </Link>
          <nav aria-label="Primary" className="hidden gap-4 text-sm text-[var(--muted-foreground)] md:flex">
            <Link href="/about" className="hover:text-[var(--foreground)]">
              About
            </Link>
            <Link href="/contact" className="hover:text-[var(--foreground)]">
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
