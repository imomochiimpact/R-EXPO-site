"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { ComponentProps } from "react";
import LoadingOverlay from "@/components/common/loadingOverlay/LoadingOverlay";
import type { LoadState } from "@/components/common/loadingOverlay/LoadingOverlay";

type Props = ComponentProps<"iframe">;

const GIVE_UP_MS = 15000;

const noopSubscribe = () => () => {};

export default function LoaderFrame({ onLoad, ...rest }: Props) {
  // iframe には complete が無く、ハイドレーション前に load が終わると検知できないため、クライアントでだけ iframe を置く
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [state, setState] = useState<LoadState>("loading");

  // 別ドメインの iframe は失敗を検知できないので、一定時間で外す
  useEffect(() => {
    if (state !== "loading") return;
    const timer = window.setTimeout(() => setState("loaded"), GIVE_UP_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <>
      {mounted && (
        <iframe
          {...rest}
          onLoad={(e) => {
            setState("loaded");
            onLoad?.(e);
          }}
        />
      )}
      <LoadingOverlay state={state} />
    </>
  );
}
