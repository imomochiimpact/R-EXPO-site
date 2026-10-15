import TransitionLink from "@/components/common/pageTransration/TransrationLink";
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
        <TransitionLink href="/" origin="underline" className={styles.back}>
          ← TOP
        </TransitionLink>
      </section>
    </>
  );
}
