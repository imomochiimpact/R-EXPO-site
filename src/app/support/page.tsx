import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import SupportApply from "@/components/support/supportApply/SupportApply";
import SupportLetter from "@/components/support/supportLetter/SupportLetter";
import SupportTypes from "@/components/support/supportTypes/SupportTypes";
import { PAGE_OPEN } from "@/constants/pages";

export const metadata: Metadata = {
  title: "寄付・協賛",
};

export default function Page() {
  if (!PAGE_OPEN.support) {
    return (
      <main>
        <ComingSoon label="SUPPORT" title="寄付・協賛" tone="blue" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader label="SUPPORT" title="寄付・協賛" tone="blue" />
      <SupportLetter />
      <SupportTypes />
      <SupportApply />
    </main>
  );
}
