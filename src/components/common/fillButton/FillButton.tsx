"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import styles from "./FillButton.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "navy" | "white" | "solid" | "teal";
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
};

const setFill = (e: PointerEvent<HTMLElement>, r: string | null) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  if (r !== null) el.style.setProperty("--r", r);
};

export default function FillButton({
  href,
  children,
  variant = "navy",
  size = "md",
  external = false,
  className,
}: Props) {
  const cls = className ? `${styles.button} ${className}` : styles.button;
  const arrow = external ? "↗" : "→";
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        {arrow}
      </span>
      <span className={styles.fill} aria-hidden="true">
        <span className={styles.label}>{children}</span>
        <span className={styles.arrow}>{arrow}</span>
      </span>
    </>
  );
  const handlers = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => setFill(e, "160%"),
    onPointerMove: (e: PointerEvent<HTMLElement>) => setFill(e, null),
    onPointerLeave: (e: PointerEvent<HTMLElement>) => setFill(e, "0px"),
  };

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-variant={variant} data-size={size} {...handlers}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} data-variant={variant} data-size={size} {...handlers}>
      {content}
    </Link>
  );
}
