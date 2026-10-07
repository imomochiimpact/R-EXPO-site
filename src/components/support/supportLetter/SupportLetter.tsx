import styles from "./SupportLetter.module.css";

export default function SupportLetter() {
  return (
    <section className={styles.letter} aria-labelledby="support-letter-heading">
      <h2 id="support-letter-heading" className={styles.title} data-reveal="">
        R-EXPO 2027 へのご支援のお願い
      </h2>
      <div className={styles.body} data-reveal="">
      <p className={styles.text}>
        R-EXPO は、社会連携の取り組みとして本校が立ち上げた行事です。道内の中学生・高校生の様々な活動や活躍を、中学校・高校・大学、公的機関、企業の皆さまとともに発表できる場をつくることを目指しています。
      </p>
      <p className={styles.text}>
        第1回では、本校や他校による学術的な取り組みのプレゼンテーションや、生徒が推薦した国内外で活躍する中高生と北海道大学によるテーブルセッションなどを行い、第一歩を踏み出すことができました。
      </p>
      <p className={styles.text}>
        さらに発展させた第2回「R-EXPO 2027」（2027年2月11日開催）に向けて、寄付・協賛・協力によるご支援をお願いしております。ご協力のほど、何卒よろしくお願い申し上げます。
      </p>
      </div>
    </section>
  );
}
