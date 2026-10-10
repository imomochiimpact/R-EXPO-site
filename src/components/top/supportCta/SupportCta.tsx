import FillButton from "@/components/common/fillButton/FillButton";
import { EXTERNAL_LINKS } from "@/constants/links";
import styles from "./SupportCta.module.css";

export default function SupportCta() {
  return (
    <section className={styles.cta} aria-labelledby="support-heading">
      <div className={styles.inner}>
        <div data-reveal="">
          <p className={styles.label}>SUPPORT</p>
          <h2 id="support-heading" className={styles.title}>
            寄付・協賛のお願い
          </h2>
          <p className={styles.lead}>
            道内の中高校生の様々な活動や活躍を発表できる場「R-EXPO」<br></br>第2回（2027年2月11日開催）に向けて、寄付・協賛・協力によるご支援をお願いしております。
          </p>
        </div>
        <div data-reveal="">
          <FillButton href={EXTERNAL_LINKS.supportForm} variant="white" external>
            申込フォームへ
          </FillButton>
          <p className={styles.note}>外部のフォームが開きます。</p>
        </div>
      </div>
    </section>
  );
}
