// import type { Metadata } from "next";
// import PageHeader from "@/components/common/pageHeader/PageHeader";
// import StageColumns from "@/components/stage/stageColumns/StageColumns";
// import StageList from "@/components/stage/stageList/StageList";

// export const metadata: Metadata = {
//   title: "ステージ",
// };

// export default function Page() {
//   return (
//     <main>
//       <PageHeader
//         label="STAGE"
//         title="ステージ"
//         tone="blue"
//         lead="R-EXPO 2027 は、4つのステージで構成されます。ステージ全体のコンセプト文がここに入ります。"
//       >
//         <StageColumns />
//       </PageHeader>
//       <StageList />
//     </main>
//   );
// }

import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";

export const metadata: Metadata = {
  title: "ステージ",
};

export default function Page() {
  return (
    <main>
      <ComingSoon label="STAGE" title="ステージ" tone="blue" />
    </main>
  );
}
