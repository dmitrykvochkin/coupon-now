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
          "flex overflow-hidden rounded-full border border-zinc-300 bg-white shadow-sm",
          variant === "hero" && "rounded-2xl border-zinc-200 shadow-md",
        )}
      >
        <input
          id="coupon-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search merchants or coupon codes"
          className={cn(
            "min-w-0 flex-1 px-4 py-3 text-base text-zinc-900 outline-none placeholder:text-zinc-400",
            variant === "hero" && "px-6 py-4 text-lg",
          )}
        />
        <button
          type="submit"
          className={cn(
            "bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700",
            variant === "hero" && "px-8 py-4 text-base",
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}
