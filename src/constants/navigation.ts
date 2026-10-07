import type { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "R-EXPO 2027について", href: "/about", tone: "pink", published: true },
  { label: "ステージ", href: "/stage", tone: "blue", published: false },
  { label: "アクセス", href: "/location", tone: "green", published: true },
  { label: "寄付・協賛", href: "/support", tone: "blue", published: true },
  { label: "過去の開催", href: "/history", tone: "purple", published: true },
];
