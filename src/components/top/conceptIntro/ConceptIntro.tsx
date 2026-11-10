import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import styles from "./ConceptIntro.module.css";

export default function ConceptIntro() {
  return (
    <section className={styles.section} aria-labelledby="concept-heading" data-reveal="">
      <p className={styles.label}>CONCEPT</p>
      <h2 id="concept-heading" className={styles.theme}>
        まだ見ぬ個性を、映し出せ。
      </h2>
      <p className={styles.summary}>
        R-EXPOは、中高生一人ひとりの個性と挑戦を発信するイベントです。
        学校や年齢といった枠を越え、まだ見ぬ可能性を見つける場所へ。
      </p>
      <TransitionLink href="/about" origin="underline" className={styles.more}>
        コンセプト・ご挨拶を読む →
      </TransitionLink>
    </section>
  );
}
