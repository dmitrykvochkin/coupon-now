"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  defaultValue?: string;
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBar({
  defaultValue = "",
  variant = "compact",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} role="search">
      <label htmlFor="coupon-search" className="sr-only">
        Search merchants and coupon codes
      </label>
      <div
        className={cn(
          "flex min-h-11 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card)] shadow-sm",
          variant === "hero" && "rounded-2xl",
        )}
      >
        <input
          id="coupon-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search merchants or coupon codes"
          className={cn(
            "min-w-0 flex-1 px-4 py-3 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)]",
            variant === "hero" && "px-6 py-4 text-lg",
          )}
        />
        <button
          type="submit"
          className={cn(
            "min-h-11 bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:bg-[#c63f00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
            variant === "hero" && "px-8 py-4 text-base",
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}
