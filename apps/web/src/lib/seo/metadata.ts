import type { Metadata } from "next";
import { getSiteUrl } from "../utils";

const siteName = "Coupon Now";

export function buildPageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${getSiteUrl()}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_US",
    },
  };
}

export const defaultMetadata: Metadata = buildPageMetadata({
  title: `${siteName} — Coupon Search and Promo Code Discovery`,
  description:
    "Search verified coupon codes and promo deals from hundreds of merchants. Copy codes and save at checkout.",
  path: "/",
});

export { siteName };
