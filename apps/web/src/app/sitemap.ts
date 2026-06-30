import type { MetadataRoute } from "next";
import { getAllMerchantSlugs } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const merchantSlugs = await getAllMerchantSlugs();

  const staticRoutes = ["", "/search", "/about", "/contact", "/privacy", "/terms", "/disclosure"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...merchantSlugs.map((slug) => ({
      url: `${baseUrl}/merchant/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
