import type { AccentTone } from "@/types/tone";

export const TOP_LINKS: {
  href: string;
  title: string;
  sub: string;
  tone: AccentTone;
}[] = [
  { href: "/about", title: "コンセプト・ご挨拶", sub: "行事部委員長・生徒会長より", tone: "pink" },
  { href: "/location", title: "会場情報", sub: "日時・会場・アクセス・地図", tone: "green" },
  { href: "/history/2026", title: "過去開催の記録", sub: "前回の様子と規模", tone: "purple" },
  { href: "/support", title: "寄付・協賛のお願い", sub: "ご支援をお考えの皆さまへ", tone: "blue" },
];

export const TOP_ARCHIVE = {
  year: "2026",
  photos: ["2026 会場全景", "出展ブース", "来場者の様子"],
};

export const HERO_IMAGE = {
  src: "https://r-expo.site/2027/photos/rexpoHero.webp",
  alt: "楽しげに話す男女",
};