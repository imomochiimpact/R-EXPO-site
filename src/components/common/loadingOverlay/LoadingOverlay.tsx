"use client";

import { useEffect, useRef } from "react";
import StageShape from "@/components/common/stageShape/StageShape";
import styles from "./LoadingOverlay.module.css";

export type LoadState = "loading" | "loaded" | "error";

type Props = {
  state: LoadState;
  errorLabel?: string;
};

const MARKS = ["circle", "square", "triangle", "semicircle"] as const;

const HOP_EASE = "cubic-bezier(.33,0,.4,1)";
const DURATION = 900;
const STAGGER = 110;
const PERIOD = 2200;

// 跳ねる高さは図形の大きさに対する割合（枠の大きさが場所ごとに違うため）
const hopKeyframes: Keyframe[] = [
  { transform: "translateY(0) scale(1,1)" },
  { transform: "translateY(0) scale(1.06,.94)", offset: 0.12 },
  { transform: "translateY(-73%) scale(.98,1.02)", offset: 0.45, easing: "cubic-bezier(.45,0,.75,.4)" },
  { transform: "translateY(0) scale(1,1)", offset: 0.8 },
  { transform: "translateY(0) scale(1.06,.94)", offset: 0.88 },
  { transform: "translateY(0) scale(1,1)" },
];

const shadowKeyframes: Keyframe[] = [
  { transform: "scaleX(1)", opacity: 1 },
  { transform: "scaleX(.55)", opacity: 0.6, offset: 0.45 },
  { transform: "scaleX(1)", opacity: 1, offset: 0.8 },
  { transform: "scaleX(1)", opacity: 1 },
];

export default function LoadingOverlay({ state, errorLabel = "NO IMAGE" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  // 読み込み中だけ跳ねさせる
  useEffect(() => {
    const root = rootRef.current;
    if (state !== "loading" || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hops = root.querySelectorAll<HTMLElement>("[data-hop]");
    const shadows = root.querySelectorAll<HTMLElement>("[data-shadow]");

    const run = () => {
      hops.forEach((el, i) => {
        el.animate(hopKeyframes, { delay: i * STAGGER, duration: DURATION, easing: HOP_EASE, fill: "both" });
        shadows[i]?.animate(shadowKeyframes, { delay: i * STAGGER, duration: DURATION, easing: "linear", fill: "both" });
      });
    };

    run();
    const timer = window.setInterval(run, PERIOD);
    return () => {
      window.clearInterval(timer);
      root.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };
  }, [state]);

  return (
    <div ref={rootRef} className={styles.root} data-state={state} aria-hidden="true">
      <div className={styles.marks}>
        {MARKS.map((name) => (
          <div key={name} className={styles.mark} data-shape={name}>
            <span data-shadow className={styles.shadow} />
            <span data-hop className={styles.shape}>
              <StageShape shape={name} />
            </span>
          </div>
        ))}
      </div>
      <p className={styles.label}>{state === "error" ? errorLabel : "LOADING"}</p>
    </div>
  );
}
