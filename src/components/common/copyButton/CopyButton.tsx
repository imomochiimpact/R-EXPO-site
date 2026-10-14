"use client";

import { useEffect, useState } from "react";
import styles from "./CopyButton.module.css";

type Props = {
  text: string;
  label?: string;
};

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export default function CopyButton({ text, label = "コピー" }: Props) {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <button
      type="button"
      className={styles.button}
      data-status={status}
      onClick={async () => setStatus((await copy(text)) ? "done" : "error")}
    >
      {(["idle", "done", "error"] as const).map((key) => (
        <span
          key={key}
          className={styles.text}
          aria-hidden={key !== status}
          aria-live={key === status ? "polite" : undefined}
        >
          {key === "done" ? "コピーしました" : key === "error" ? "コピーできませんでした" : label}
        </span>
      ))}
    </button>
  );
}
