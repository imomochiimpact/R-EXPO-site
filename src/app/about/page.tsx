import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import { PAGE_OPEN } from "@/constants/pages";
import Concept from "@/components/about/concept/Concept";
import StageOverview from "@/components/stage/stageOverview/StageOverview";
import Greetings from "@/components/about/greetings/Greetings";

export const metadata: Metadata = {
  title: "R-EXPO 2027について",
};

export default function Page() {
  if (!PAGE_OPEN.about) {
    return (
      <main>
        <ComingSoon label="ABOUT" title="R-EXPO 2027について" tone="pink" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader label="ABOUT" title="R-EXPO 2027について" tone="pink" />
      <Concept />
      <StageOverview />
      <Greetings />
    </main>
  );
}
