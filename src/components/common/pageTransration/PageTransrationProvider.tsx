"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { TransitionTone } from "@/types/tone";
import styles from "./PageTransration.module.css";

type Start = (href: string, origin: DOMRect, tone: TransitionTone) => void;

const TransitionContext = createContext<Start | null>(null);
export const usePageTransition = () => useContext(TransitionContext);

// 横（起点の高さのまま横幅いっぱいの帯へ）→ 縦（全面へ）の2段階。戻りは逆順
const WIDE_MS = 260;
const TALL_MS = 360;
const FALLBACK_MS = 4000; // 遷移が終わらない場合の保険
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.25, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.7, 0.2, 1)";
const STRIPE_FROM = 0.4; // 縞は矩形の右下、各辺の 40% 地点を結んだ三角

const fullRect = () => new DOMRect(0, 0, window.innerWidth, window.innerHeight);
const goneRect = () => new DOMRect(0, 0, window.innerWidth, 0);
const bandRect = (r: DOMRect) => new DOMRect(0, r.top, window.innerWidth, r.height);

// fixed 要素なので viewport 基準の inset() に変換する
const toInset = (r: DOMRect) =>
  `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;

// 縞の三角も同じ矩形から作り、塗りと一緒に伸縮させる
const toStripe = (r: DOMRect) =>
  `polygon(${r.right}px ${r.top + r.height * STRIPE_FROM}px, ${r.right}px ${r.bottom}px, ${r.left + r.width * STRIPE_FROM}px ${r.bottom}px)`;

const nextFrame = () =>
  new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const waiting = useRef(false);
  const fallback = useRef<number>(undefined);

  const place = useCallback((rect: DOMRect, ms = 0, ease = "linear") => {
    const el = overlayRef.current;
    const stripe = stripeRef.current;
    if (!el || !stripe) return Promise.resolve();
    const transition = ms ? `clip-path ${ms}ms ${ease}` : "none";
    el.style.transition = transition;
    stripe.style.transition = transition;
    el.style.clipPath = toInset(rect);
    stripe.style.clipPath = toStripe(rect);
    return new Promise<void>((res) => window.setTimeout(res, ms));
  }, []);

  const reveal = useCallback(async () => {
    const el = overlayRef.current;
    if (!el || !waiting.current) return;
    waiting.current = false;
    window.clearTimeout(fallback.current);

    await nextFrame(); // 新しいページの描画とスクロールリセットを待つ
    const target = document.querySelector<HTMLElement>("[data-transition-target]");
    document.documentElement.dataset.transition = "reveal";
    if (target) {
      const rect = target.getBoundingClientRect();
      await place(bandRect(rect), TALL_MS, EASE_IN_OUT);
      await place(rect, WIDE_MS, EASE_OUT);
    } else {
      await place(goneRect(), TALL_MS, EASE_OUT);
    }

    el.style.visibility = "hidden";
    await place(goneRect());
    delete document.documentElement.dataset.transition;
    busy.current = false;
  }, [place]);

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
      await place(origin);
      el.style.visibility = "visible";
      el.getBoundingClientRect(); // reflow で初期位置を確定させる

      document.documentElement.dataset.transition = "cover";
      await place(bandRect(origin), WIDE_MS, EASE_IN_OUT);
      await place(fullRect(), TALL_MS, EASE_IN_OUT);

      waiting.current = true;
      fallback.current = window.setTimeout(reveal, FALLBACK_MS);
      router.push(href);
    },
    [router, reveal, place],
  );

  // pathname が変わった＝新しいページが描画された
  useEffect(() => {
    reveal();
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={start}>
      {children}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
        <div ref={stripeRef} className={styles.stripe} />
      </div>
    </TransitionContext.Provider>
  );
}