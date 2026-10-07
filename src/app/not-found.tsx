import type { Metadata } from "next";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <main>
      <NotFoundMessage />
    </main>
  );
}
