"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { TransitionTone } from "@/types/tone";
import styles from "./PageTransration.module.css";

type Start = (href: string, origin: DOMRect, tone: TransitionTone) => void;

const TransitionContext = createContext<Start | null>(null);
export const usePageTransition = () => useContext(TransitionContext);

const COVER_MS = 500;
const REVEAL_MS = 500;
const FALLBACK_MS = 4000; // 遷移が終わらない場合の保険
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.25, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.7, 0.2, 1)";
const FULL = "inset(0px 0px 0px 0px)";
const GONE = "inset(0px 0px 100% 0px)";

// fixed 要素なので viewport 基準の inset() に変換する
const toInset = (r: DOMRect) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;

const nextFrame = () =>
  new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const waiting = useRef(false);
  const fallback = useRef<number>(undefined);

  const animate = (el: HTMLElement, clip: string, ms: number, ease: string) =>
    new Promise<void>((res) => {
      el.style.transition = `clip-path ${ms}ms ${ease}`;
      el.style.clipPath = clip;
      window.setTimeout(res, ms);
    });

  const reveal = useCallback(async () => {
    const el = overlayRef.current;
    if (!el || !waiting.current) return;
    waiting.current = false;
    window.clearTimeout(fallback.current);

    await nextFrame(); // 新しいページの描画とスクロールリセットを待つ
    const target = document.querySelector<HTMLElement>("[data-transition-target]");
    document.documentElement.dataset.transition = "reveal";
    await animate(el, target ? toInset(target.getBoundingClientRect()) : GONE, REVEAL_MS, EASE_OUT);

    el.style.visibility = "hidden";
    el.style.transition = "none";
    delete document.documentElement.dataset.transition;
    busy.current = false;
  }, []);

  const start = useCallback<Start>(
    async (href, origin, tone) => {
      const el = overlayRef.current;
      if (!el || busy.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      busy.current = true;

      // 起点の矩形に置く（トランジションなし）
      el.dataset.tone = tone;
      el.style.transition = "none";
      el.style.clipPath = toInset(origin);
      el.style.visibility = "visible";
      el.getBoundingClientRect(); // reflow で初期位置を確定させる

      document.documentElement.dataset.transition = "cover";
      await animate(el, FULL, COVER_MS, EASE_IN_OUT);

      waiting.current = true;
      fallback.current = window.setTimeout(reveal, FALLBACK_MS);
      router.push(href);
    },
    [router, reveal],
  );

  // pathname が変わった＝新しいページが描画された
  useEffect(() => {
    reveal();
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={start}>
      {children}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}