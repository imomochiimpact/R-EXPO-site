"use client";

import Link from "next/link";
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
              <Link
                href={item.href}
                className={styles.link}
                data-tone={item.tone}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
