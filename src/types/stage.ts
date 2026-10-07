import type { AccentTone } from "./tone";

export type StageShapeType = "circle" | "square" | "triangle" | "cross";

export type Stage = {
  num: string;
  name: string;
  tone: AccentTone;
  shape: StageShapeType;
  description: string;
};
