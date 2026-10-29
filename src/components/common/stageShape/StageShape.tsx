import { STAGE_SHAPES } from "@/constants/stageShapes";
import type { StageShapeType } from "@/types/stage";

type Props = {
  shape: StageShapeType;
  outline?: boolean;
  className?: string;
};

export default function StageShape({ shape, outline = false, className }: Props) {
  const d = STAGE_SHAPES[shape][outline ? "outline" : "solid"];

  return (
    <svg viewBox="0 0 1000 1000" className={className} aria-hidden="true" focusable="false">
      <path
        d={d}
        fill="currentColor"
        fillRule="evenodd"
        {...(!outline && {
          stroke: "currentColor",
          strokeWidth: 100,
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        })}
      />
    </svg>
  );
}
