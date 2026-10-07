"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function HeroObserver() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.heroVisible = String(entry.isIntersecting);
      },
      { rootMargin: "-60px 0px 0px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      delete root.dataset.heroVisible;
    };
  }, []);

  return <span ref={ref} className={styles.observer} aria-hidden="true" />;
}
