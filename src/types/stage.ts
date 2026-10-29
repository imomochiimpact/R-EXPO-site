import type { AccentTone } from "./tone";

export type StageShapeType = "circle" | "square" | "triangle" | "semicircle";

export type StageShapePaths = { solid: string; outline: string };

export type Stage = {
  num: string;
  name: string;
  tone: AccentTone;
  shape: StageShapeType;
  description: string;
};
