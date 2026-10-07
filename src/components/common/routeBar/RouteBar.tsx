"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/constants/navigation";
import styles from "./RouteBar.module.css";

export default function RouteBar() {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [count, setCount] = useState(0);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setCount((c) => c + 1);
  }

  if (count === 0) return null;

  const tone = NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.tone ?? "blue";

  return <div key={count} className={styles.bar} data-tone={tone} aria-hidden="true" />;
}
