"use client";

import Link from "next/link";
import { useRef } from "react";
import type { PointerEvent } from "react";
import type { AccentTone } from "@/types/tone";
import styles from "./RevealCard.module.css";

type Props = {
  href: string;
  num: string;
  title: string;
  sub: string;
  tone: AccentTone;
};

export default function RevealCard({ href, num, title, sub, tone }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const setPosition = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={styles.card}
      data-tone={tone}
      onPointerEnter={(e) => {
        setPosition(e);
        e.currentTarget.dataset.on = "true";
      }}
      onPointerMove={setPosition}
      onPointerLeave={(e) => {
        e.currentTarget.dataset.on = "false";
      }}
    >
      <span className={styles.reveal} aria-hidden="true" />
      <span className={styles.num}>{num}</span>
      <span className={styles.bottom}>
        <span>
          <span className={styles.title}>{title}</span>
          <span className={styles.sub}>{sub}</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
