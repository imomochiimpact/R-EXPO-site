"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";
import { BULB_VIEWBOX, BULB_SHARDS, BULB_BANDS } from "./bulbPaths";
import { LOADED_KEY } from "@/constants/loader";

// パーツたちの初期位置と回転角度
const PARTS = [
    { d: BULB_BANDS[2], x: 0, y: 560, r: 0 },
    { d: BULB_BANDS[1], x: 0, y: 460, r: 0 },
    { d: BULB_BANDS[0], x: 0, y: 360, r: 0 },
    { d: BULB_SHARDS[2], x: -420, y: 160, r: -12 },
    { d: BULB_SHARDS[1], x: 420, y: -120, r: 12 },
    { d: BULB_SHARDS[0], x: 0, y: -420, r: -10 },
]

const RING_COLORS = [
    "var(--accentBlue)",
    "var(--accentGreen)",
    "var(--accentPink)",
    "var(--accentPurple)",
];

const STEP_MS = 90; // 1ステップの時間
const PART_MS = 650; // パーツが所定の位置に収まるまでの時間（CSS の transition と同じ）
const FINISH_MS = 600; // 終わってからフェードアウトするまでの時間
const FADE_MS = 600; // フェードアウトの時間（CSS の transition と同じ）
const TIMEOUT_MS = 6000; // これ以上かかったら読み込みを待たずに進める

// ① 実際の読み込み度合いを 0〜1 で返す
function useLoadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tasks: Promise<unknown>[] = [];

    // 画像：まだ読み込み中のものを1枚ずつ数える
    document.querySelectorAll("img").forEach((img) => {
      if (img.complete || img.loading === "lazy") return; // 画面外で後から読む画像は待たない
      tasks.push(new Promise((r) => {
        img.addEventListener("load", r, { once: true });
        img.addEventListener("error", r, { once: true }); // 失敗しても止まらないように
      }));
    });
    // Webフォント（Oswald / Zen Kaku Gothic New）
    tasks.push(document.fonts.ready);
    // ページ全体の load イベント
    tasks.push(new Promise((r) => {
      if (document.readyState === "complete") r(null);
      else window.addEventListener("load", r, { once: true });
    }));

    let done = 0;
    tasks.forEach((t) => t.then(() => setProgress(++done / tasks.length)));
    const timeout = setTimeout(() => setProgress(1), TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, []);

  return progress;
}

export default function Loader() {
  const progress = useLoadProgress();
  const [shown, setShown] = useState(0); // 実際に表示しているパーツの数
  const [phase, setPhase] = useState<"loading" | "finish" | "hide" | "done">("loading");

  // ② 読み込み度合い → 出すパーツの数。1つずつ追いかける（早く読み終わってもパーツは順番に出す）
  const target = Math.ceil(progress * PARTS.length);
  useEffect(() => {
    if (phase !== "loading" || shown >= target) return;
    const t = setTimeout(() => setShown((n) => n + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [shown, target, phase]);

  // ③ 全パーツがそろったら finish → hide → done の順に進める
  useEffect(() => {
    if (phase === "loading") {
      if (progress < 1 || shown < PARTS.length) return;
      const t = setTimeout(() => setPhase("finish"), PART_MS);
      return () => clearTimeout(t);
    }
    if (phase === "finish") {
      const t = setTimeout(() => setPhase("hide"), FINISH_MS);
      return () => clearTimeout(t);
    }
    if (phase === "hide") {
      const t = setTimeout(() => {
        try {
          sessionStorage.setItem(LOADED_KEY, "1");
        } catch {}
        setPhase("done");
      }, FADE_MS);
      return () => clearTimeout(t);
    }
  }, [progress, shown, phase]);

  if (phase === "done") return null;

  return (
    <div
      className={[
        styles.overlay,
        phase === "finish" || phase === "hide" ? styles.finish : "",
        phase === "hide" ? styles.hide : "",
      ].join(" ")}
      role="progressbar"
      aria-label="読み込み中"
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className={styles.mark}>
        {RING_COLORS.map((c, i) => (
          <span key={c} className={styles.ring} style={{ "--c": c, "--i": i } as CSSProperties} />
        ))}
        <svg viewBox={BULB_VIEWBOX} className={styles.bulb} aria-hidden="true">
          {PARTS.map((p, i) => (
            <path
              key={i}
              d={p.d}
              className={`${styles.part} ${i < shown ? styles.in : ""}`}
              style={{ "--x": `${p.x}px`, "--y": `${p.y}px`, "--r": `${p.r}deg` } as CSSProperties}
            />
          ))}
        </svg>
      </div>
      <Image src="/logo/Letter.svg" alt="" width={180} height={56} className={styles.word} priority />
    </div>
  );
}