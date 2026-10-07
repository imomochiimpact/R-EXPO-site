import Link from "next/link";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import type { AccentTone } from "@/types/tone";
import styles from "./ComingSoon.module.css";

type Props = {
  label: string;
  title: string;
  tone: AccentTone;
};

export default function ComingSoon({ label, title, tone }: Props) {
  return (
    <>
      <PageHeader label={label} title={title} tone={tone} />
      <section className={styles.section}>
        <p className={styles.label} data-reveal="">
          COMING SOON
        </p>
        <p className={styles.text} data-reveal="">
          内容が決まり次第、こちらでお知らせします。
        </p>
        <Link href="/" className={styles.back}>
          ← TOP
        </Link>
      </section>
    </>
  );
}
