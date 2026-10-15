"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import styles from "./LoaderImage.module.css";

type Props = ComponentProps<typeof Image>;

type LoadState = "loading" | "fade" | "loaded" | "error";

const MARKS = ["circle", "square", "triangle", "cross"] as const;

const HOP_EASE = "cubic-bezier(.33,0,.4,1)";
const DURATION = 900;
const STAGGER = 110;
const PERIOD = 2200;
const FADE = 400;

// 跳ねる高さは図形の大きさに対する割合（枠の大きさが写真ごとに違うため）
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

export default function LoaderImage({ onLoad, onError, ...rest }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LoadState>("loading");

  // ハイドレーション前に読み込み済み（キャッシュ等）だと onLoad が来ないので、マウント時に complete を見る
  const checkComplete = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

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

  // フェードし終わったら外す
  useEffect(() => {
    if (state !== "fade") return;
    const timer = window.setTimeout(() => setState("loaded"), FADE);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <>
      <Image
        {...rest}
        ref={checkComplete}
        data-state={state}
        onLoad={(e) => {
          setState((s) => (s === "loading" ? "fade" : s));
          onLoad?.(e);
        }}
        onError={(e) => {
          setState("error");
          onError?.(e);
        }}
      />
      {state !== "loaded" && (
        <div ref={rootRef} className={styles.root} data-state={state} aria-hidden="true">
          <div className={styles.marks}>
            {MARKS.map((name) => (
              <div key={name} className={styles.mark}>
                <span data-shadow className={styles.shadow} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-hop src={`/stageMark/${name}_solid.svg`} alt="" className={styles.shape} />
              </div>
            ))}
          </div>
          <p className={styles.label}>{state === "error" ? "NO IMAGE" : "LOADING"}</p>
        </div>
      )}
    </>
  );
}
