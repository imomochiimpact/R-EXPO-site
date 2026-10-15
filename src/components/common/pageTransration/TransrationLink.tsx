"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { toneForHref } from "@/constants/navigation";
import type { TransitionTone } from "@/types/tone";
import { usePageTransition } from "@/components/common/pageTransration/PageTransrationProvider";

type Origin = "self" | "border-left" | "underline";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  tone?: TransitionTone;
  origin?: Origin;
};

// 起点の矩形：data-transition-origin の子要素 → origin prop の順で決める
const originRect = (el: HTMLElement, origin: Origin): DOMRect => {
  const marked = el.querySelector<HTMLElement>("[data-transition-origin]");
  if (marked) return marked.getBoundingClientRect();

  const r = el.getBoundingClientRect();
  if (origin === "border-left") {
    const w = parseFloat(getComputedStyle(el).borderLeftWidth) || 4;
    return new DOMRect(r.left, r.top, w, r.height);
  }
  if (origin === "underline") return new DOMRect(r.left, r.bottom - 2, r.width, 2);
  return r;
};

const normalize = (p: string) => p.replace(/\/$/, "") || "/";

export default function TransitionLink({ href, tone, origin = "self", onClick, ...rest }: Props) {
  const start = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !start) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href.startsWith("#") || normalize(href) === normalize(pathname)) return;

    e.preventDefault();
    start(href, originRect(e.currentTarget, origin), tone ?? toneForHref(href));
  };

  return <Link {...rest} href={href} onClick={handleClick} />;
}