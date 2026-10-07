"use client";

import { useEffect } from "react";

const FALLBACK_MS = 1500;
const STAGGER_MS = 70;

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = Array.from(
      document.querySelectorAll<HTMLElement>('main [data-reveal]:not([data-reveal="shown"])'),
    );
    pending.forEach((el) => {
      el.dataset.reveal = "hidden";
    });

    const show = (el: HTMLElement, delay: number) => {
      el.style.transitionDelay = `${delay}ms`;
      el.dataset.reveal = "shown";
    };

    const check = () => {
      const limit = window.innerHeight * 0.94;
      let batch = 0;
      pending = pending.filter((el) => {
        if (!el.isConnected) return false;
        if (el.getBoundingClientRect().top < limit) {
          show(el, (batch++ % 6) * STAGGER_MS);
          return false;
        }
        return true;
      });
      if (pending.length === 0) teardown();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    const fallback = window.setTimeout(() => {
      pending.forEach((el) => show(el, 0));
      pending = [];
      teardown();
    }, FALLBACK_MS);

    function teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return () => {
      teardown();
      window.clearTimeout(fallback);
      pending.forEach((el) => {
        el.dataset.reveal = "";
      });
    };
  }, []);

  return null;
}
