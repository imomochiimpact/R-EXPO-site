"use client";

import Image from "next/image";
import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EXTERNAL_LINKS } from "@/constants/links";
import { NAV_ITEMS } from "@/constants/navigation";
import styles from "./MobileMenu.module.css";

const ITEMS = [
  { label: "トップ", href: "/", tone: "primary" as const },
  ...NAV_ITEMS,
];

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const openButton = openButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        className={styles.burger}
        aria-label="メニューを開く"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="メニュー" className={styles.overlay}>
          <div className={styles.top}>
            <TransitionLink
              href="/"
              origin="self"
              className={styles.logo}
              onClick={() => pathname === "/" && setOpen(false)}
            >
              <Image
                src="/logo/LogoH_white.svg"
                alt="R-EXPO 2027"
                width={5587}
                height={1377}
                unoptimized
                className={styles.logoImage}
              />
            </TransitionLink>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              aria-label="メニューを閉じる"
              onClick={() => setOpen(false)}
            >
              <span className={styles.closeLine} />
              <span className={styles.closeLine} />
            </button>
          </div>

          <nav aria-label="メニュー">
            <ul className={styles.list}>
              {ITEMS.map((item, i) => {
                const isCurrent = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li
                    key={item.href}
                    className={styles.item}
                    style={{ animationDelay: `${0.18 + i * 0.05}s` }}
                  >
                    <TransitionLink
                      href={item.href}
                      tone={item.tone}
                      className={styles.link}
                      data-tone={item.tone}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => pathname === item.href && setOpen(false)}
                    >
                      <span className={styles.edge} data-transition-origin="" aria-hidden="true" />
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.label}>{item.label}</span>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul className={styles.externals}>
            <li>
              <a href={EXTERNAL_LINKS.school} target="_blank" rel="noopener noreferrer" className={styles.external}>
                学校公式サイト
              </a>
            </li>
            <li>
              <a href={EXTERNAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={styles.external}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
