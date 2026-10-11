import type { HistoryEntry } from "@/types/history";
import { HISTORY_2026 } from "./2026";

export const HISTORY: HistoryEntry[] = [HISTORY_2026].sort((a, b) => Number(a.year) - Number(b.year));

export const LATEST_HISTORY = HISTORY[HISTORY.length - 1];
