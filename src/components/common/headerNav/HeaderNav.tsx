"use client";

import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import styles from "./HeaderNav.module.css";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="メインメニュー">
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => {
          const isCurrent = pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                origin="underline"
                tone={item.tone}
                className={styles.link}
                data-tone={item.tone}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
