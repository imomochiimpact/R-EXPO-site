"use client";

import { LOADED_CHECK_SCRIPT } from "@/constants/loader";

// SSRのHTMLでは即時実行させ、クライアントで再生成された時はデータ扱いにしてReactの警告を避ける
export default function LoadedCheckScript() {
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      dangerouslySetInnerHTML={{ __html: LOADED_CHECK_SCRIPT }}
      suppressHydrationWarning
    />
  );
}
