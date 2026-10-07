import type { MetadataRoute } from "next";
import { HISTORY } from "@/constants/history";
import { NAV_ITEMS } from "@/constants/navigation";
import { SITE_URL } from "@/constants/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...NAV_ITEMS.filter((item) => item.published).map((item) => item.href),
    ...HISTORY.map((entry) => `/history/${entry.year}`),
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
