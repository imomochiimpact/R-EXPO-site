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

// HeaderNav.module.css の .link の高さと同じ計算：ロゴ下端 + ロゴ高さ×0.12
const EDGE_RATIO = 0.12;

// ヘッダー（ナビ・ロゴ）からの遷移なら、下線の高さの y を返す
const headerEdge = (el: HTMLElement): number | undefined => {
  if (!el.closest("[data-transition-edge]")) return undefined;
  const logo = document.querySelector<HTMLElement>("[data-header-logo]");
  if (!logo) return undefined;
  const r = logo.getBoundingClientRect();
  return r.bottom + r.height * EDGE_RATIO;
};

// 起点がヘッダーの裏に隠れている部分は切り落とす（遷移の幕はヘッダーより手前に出るため）。メニュー内はヘッダーが裏にあるので対象外
const belowHeader = (el: HTMLElement, r: DOMRect): DOMRect => {
  if (el.closest('[role="dialog"]')) return r;
  const limit = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  const top = Math.max(r.top, limit);
  return new DOMRect(r.left, top, r.width, Math.max(0, r.bottom - top));
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
    const el = e.currentTarget;
    const r = originRect(el, origin);
    // ナビはホバーで浮いている（transform）ので、見えている下線の位置をそのまま使う
    const edgeY = origin === "underline" && headerEdge(el) != null ? r.bottom : headerEdge(el);
    // ヘッダーからのときは、押した要素の幅で下線の高さに 2px の線を置く
    const rect = edgeY != null ? new DOMRect(r.left, edgeY - 2, r.width, 2) : belowHeader(el, r);
    start(href, rect, tone ?? toneForHref(href), edgeY);
  };

  return <Link {...rest} href={href} onClick={handleClick} />;
}
