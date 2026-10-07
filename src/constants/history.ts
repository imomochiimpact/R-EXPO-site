import type { HistoryEntry } from "@/types/history";

export const HISTORY: HistoryEntry[] = [
  {
    year: "2026",
    title: "R-EXPO 2026",
    summary:
      "本校や他校による学術的な取り組みのプレゼンテーションや、生徒が推薦した国内外で活躍する中高生と北海道大学によるテーブルセッションなどを行いました。",
    photos: [
      { label: "会場全景", wide: true },
      { label: "プレゼンテーション" },
      { label: "テーブルセッション" },
      { label: "ブース" },
      { label: "来場者" },
      { label: "運営の生徒", wide: true },
    ],
    stats: [
      { label: "来場者数", value: "約2500人" },
      { label: "出展・発表団体", value: "—" },
    ],
  },
];
