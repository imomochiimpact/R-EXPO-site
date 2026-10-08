import FillButton from "@/components/common/fillButton/FillButton";
import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import { EXTERNAL_LINKS } from "@/constants/links";
import { SITE_URL } from "@/constants/site";
import styles from "./SupportApply.module.css";

export default function SupportApply() {
  return (
    <div className={styles.grid}>
      <section aria-labelledby="support-apply-heading" data-reveal="">
        <SectionTitle id="support-apply-heading" label="HOW TO APPLY" title="申込方法" />
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.num}>01</span>
            <p className={styles.text}>下記の申込フォームに必要事項をご入力ください。</p>
          </li>
          <li className={styles.step}>
            <span className={styles.num}>02</span>
            <div>
              <p className={styles.text}>ご入力いただいたメールアドレスへ、本校よりご連絡いたします。</p>
              <ul className={styles.subList}>
                <li>寄付・協賛の方：入金方法や特典のご案内</li>
                <li>協力の方：ポスター・チラシのお渡しについてのご相談</li>
              </ul>
            </div>
          </li>
        </ol>
        <FillButton href={EXTERNAL_LINKS.supportForm} variant="solid" external className={styles.action}>
          申込フォームを開く
        </FillButton>
      </section>

      <section aria-labelledby="support-other-heading" data-reveal="">
        <SectionTitle id="support-other-heading" label="REQUEST" title="その他のお願い" />
        <p className={styles.note}>
          メール・アプリ・ホームページなどで R-EXPOをご紹介いただける場合は、本サイトの URL（
          <a href={SITE_URL} className={styles.url}>
            {SITE_URL}
          </a>
          ）をご案内いただけますと幸いです。
        </p>
        <div className={styles.sponsors}>
          <p className={styles.sponsorsTitle}>ご支援いただいた皆さまへ</p>
          <p className={styles.sponsorsText}>ご紹介ページは後日公開します。</p>
        </div>
      </section>
    </div>
  );
}
