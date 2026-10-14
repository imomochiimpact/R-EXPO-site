import type { NavItem } from "@/types/navigation";
import { PAGE_OPEN } from "./pages";

export const NAV_ITEMS: NavItem[] = [
  { label: "R-EXPO 2027について", href: "/about", tone: "pink", published: PAGE_OPEN.about },
  { label: "ステージ", href: "/stage", tone: "blue", published: PAGE_OPEN.stage },
  { label: "アクセス", href: "/location", tone: "green", published: PAGE_OPEN.location },
  { label: "寄付・協賛", href: "/support", tone: "blue", published: PAGE_OPEN.support },
  { label: "過去の開催", href: "/history", tone: "purple", published: PAGE_OPEN.history },
];
