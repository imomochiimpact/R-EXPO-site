export type HistoryPhoto = {
  label: string;
  src?: string;
  wide?: boolean;
};

export type HistoryStat = {
  label: string;
  value: string;
};

export type HistoryEntry = {
  year: string;
  title: string;
  summary: string;
  photos: HistoryPhoto[];
  stats: HistoryStat[];
};
