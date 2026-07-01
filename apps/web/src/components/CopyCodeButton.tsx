"use client";

import { useState } from "react";

interface CopyCodeButtonProps {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="min-h-11 rounded-md border border-[var(--primary)] bg-[var(--secondary)] px-3 py-1.5 text-sm font-medium text-[var(--secondary-foreground)] transition hover:bg-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
      aria-label={`Copy coupon code ${code}`}
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}
