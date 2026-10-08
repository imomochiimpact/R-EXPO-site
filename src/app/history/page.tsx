// import type { Metadata } from "next";
// import PageHeader from "@/components/common/pageHeader/PageHeader";
// import HistoryDetail from "@/components/history/historyDetail/HistoryDetail";
// import HistoryTabs from "@/components/history/historyTabs/HistoryTabs";
// import { HISTORY } from "@/constants/history";

// export const metadata: Metadata = {
//   title: "過去の開催",
// };

// export default function Page() {
//   const latest = HISTORY[HISTORY.length - 1];

//   return (
//     <main>
//       <PageHeader
//         label="HISTORY"
//         title="過去の開催"
//         tone="purple"
//         extra={<HistoryTabs current={latest.year} />}
//       />
//       <HistoryDetail entry={latest} />
//     </main>
//   );
// }

import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";

export const metadata: Metadata = {
  title: "過去の記録",
};

export default function Page() {
  return (
    <main>
      <ComingSoon label="HISTORY" title="過去の記録" tone="purple" />
    </main>
  );
}
