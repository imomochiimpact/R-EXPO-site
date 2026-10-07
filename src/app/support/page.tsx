import type { Metadata } from "next";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import SupportApply from "@/components/support/supportApply/SupportApply";
import SupportLetter from "@/components/support/supportLetter/SupportLetter";
import SupportTypes from "@/components/support/supportTypes/SupportTypes";

export const metadata: Metadata = {
  title: "寄付・協賛",
};

export default function Page() {
  return (
    <main>
      <PageHeader label="SUPPORT" title="寄付・協賛" tone="blue" />
      <SupportLetter />
      <SupportTypes />
      <SupportApply />
    </main>
  );
}
