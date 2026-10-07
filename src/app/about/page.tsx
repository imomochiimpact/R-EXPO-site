import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";

export const metadata: Metadata = {
  title: "R-EXPO 2027について",
};

export default function Page() {
  return (
    <main>
      <ComingSoon label="ABOUT" title="R-EXPO 2027について" tone="pink" />
    </main>
  );
}
