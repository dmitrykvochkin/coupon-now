"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <Button
      type="button"
      variant="secondary"
      onClick={handleCopy}
      className="min-h-11 border border-primary px-3 py-1.5"
      aria-label={`Copy coupon code ${code}`}
    >
      {copied ? "Copied!" : "Copy code"}
    </Button>
  );
}
