import Link from "next/link";
import styles from "./ConceptIntro.module.css";

export default function ConceptIntro() {
  return (
    <section className={styles.section} aria-labelledby="concept-heading" data-reveal="">
      <p className={styles.label}>CONCEPT</p>
      <h2 id="concept-heading" className={styles.theme}>
        まだみぬ個性を映し出せ
      </h2>
      <p className={styles.summary}>
        コンセプトの説明文がここに入ります。
      </p>
      <Link href="/about" className={styles.more}>
        コンセプト・ご挨拶を読む →
      </Link>
    </section>
  );
}
