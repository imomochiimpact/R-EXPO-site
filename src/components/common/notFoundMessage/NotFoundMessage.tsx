import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import styles from "./NotFoundMessage.module.css";

export default function NotFoundMessage() {
  return (
    <section className={styles.section}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>ページが見つかりません</h1>
      <p className={styles.text}>
        お探しのページは移動または削除された可能性があります。URLをご確認のうえ、トップページからお探しください。
      </p>
      <TransitionLink href="/" origin="underline" className={styles.back}>
        ← TOP
      </TransitionLink>
    </section>
  );
}
