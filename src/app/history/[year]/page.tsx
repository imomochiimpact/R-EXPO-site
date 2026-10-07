import { notFound } from "next/navigation";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
// import PageHeader from "@/components/common/pageHeader/PageHeader";
// import HistoryDetail from "@/components/history/historyDetail/HistoryDetail";
// import HistoryTabs from "@/components/history/historyTabs/HistoryTabs";
import { HISTORY } from "@/constants/history";

export function generateStaticParams() {
  return HISTORY.map((entry) => ({ year: entry.year }));
}

export const dynamicParams = false;

export default async function Page(props: PageProps<"/history/[year]">) {
  const { year } = await props.params;
  const entry = HISTORY.find((e) => e.year === year);
  if (!entry) notFound();

  return (
    <main>
      <ComingSoon label="HISTORY" title={entry.title} tone="purple" />
      {/* <PageHeader
        label="HISTORY"
        title="過去の開催"
        tone="purple"
        extra={<HistoryTabs current={entry.year} />}
      />
      <HistoryDetail entry={entry} /> */}
    </main>
  );
}
