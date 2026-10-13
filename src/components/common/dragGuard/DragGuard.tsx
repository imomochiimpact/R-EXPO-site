"use client";

import { useEffect } from "react";

export default function DragGuard() {
  useEffect(() => {
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof Element && e.target.closest("img, a")) e.preventDefault();
    };
    const onContextMenu = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("img")) e.preventDefault();
    };
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);

  return null;
}
