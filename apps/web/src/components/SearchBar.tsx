"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const inputId = useId();

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
      <label htmlFor={inputId} className="sr-only">
        Search merchants and coupon codes
      </label>
      <div
        className={cn(
          "flex min-h-11 overflow-hidden rounded-full border border-border bg-card shadow-sm",
          variant === "hero" && "rounded-2xl",
        )}
      >
        <Input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search merchants or coupon codes"
          className={cn(
            "h-11 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 py-3 text-base shadow-none focus-visible:ring-0",
            variant === "hero" && "h-14 px-6 py-4 text-lg",
          )}
        />
        <Button
          type="submit"
          size="lg"
          className={cn(
            "h-auto min-h-11 rounded-none px-5 py-3 text-sm font-semibold",
            variant === "hero" && "min-h-14 px-8 py-4 text-base",
          )}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
