"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { ComponentProps } from "react";
import LoadingOverlay from "@/components/common/loadingOverlay/LoadingOverlay";
import type { LoadState } from "@/components/common/loadingOverlay/LoadingOverlay";

type Props = ComponentProps<typeof Image>;

export default function LoaderImage({ onLoad, onError, ...rest }: Props) {
  const [state, setState] = useState<LoadState>("loading");

  // ハイドレーション前に読み込み済み（キャッシュ等）だと onLoad が来ないので、マウント時に complete を見る
  const checkComplete = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <>
      <Image
        {...rest}
        ref={checkComplete}
        data-state={state}
        onLoad={(e) => {
          setState((s) => (s === "loading" ? "loaded" : s));
          onLoad?.(e);
        }}
        onError={(e) => {
          setState("error");
          onError?.(e);
        }}
      />
      <LoadingOverlay state={state} />
    </>
  );
}
