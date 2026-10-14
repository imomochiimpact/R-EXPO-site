import type { MetadataRoute } from "next";
import { HISTORY } from "@/constants/history";
import { NAV_ITEMS } from "@/constants/navigation";
import { PAGE_OPEN } from "@/constants/pages";
import { SITE_URL } from "@/constants/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...NAV_ITEMS.filter((item) => item.published && item.href !== "/history").map((item) => item.href),
    ...(PAGE_OPEN.history ? HISTORY.map((entry) => `/history/${entry.year}`) : []),
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
