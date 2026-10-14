import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import HistoryDetail from "@/components/history/historyDetail/HistoryDetail";
import HistoryTabs from "@/components/history/historyTabs/HistoryTabs";
import { LATEST_HISTORY } from "@/constants/history";
import { PAGE_OPEN } from "@/constants/pages";

export const metadata: Metadata = {
  title: "過去の開催",
  alternates: { canonical: `/history/${LATEST_HISTORY.year}` },
};

export default function Page() {
  if (!PAGE_OPEN.history) {
    return (
      <main>
        <ComingSoon label="HISTORY" title="過去の開催" tone="purple" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        label="HISTORY"
        title="過去の開催"
        tone="purple"
        extra={<HistoryTabs current={LATEST_HISTORY.year} />}
      />
      <HistoryDetail entry={LATEST_HISTORY} />
    </main>
  );
}
