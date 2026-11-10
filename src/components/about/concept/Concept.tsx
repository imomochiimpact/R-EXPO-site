import StageShape from "@/components/common/stageShape/StageShape";
import { STAGES } from "@/constants/stages";
import styles from "./Concept.module.css";

export default function Concept() {
  return (
    <section className={styles.section} aria-labelledby="concept-heading">
      <div className={styles.inner} data-reveal="">
        <p className={styles.label}>CONCEPT</p>
        <div className={styles.shapes} aria-hidden="true">
          {STAGES.map((s) => (
            <StageShape key={s.num} shape={s.shape} className={styles.shape} data-tone={s.tone} />
          ))}
        </div>
        <h2 id="concept-heading" className={styles.theme}>
          まだ見ぬ個性を、
          <br />
          映し出せ。
        </h2>
        <span className={styles.rule} aria-hidden="true" />
        <div className={styles.body}>
          <p>R-EXPOは、中高生一人ひとりの個性と挑戦を発信するイベントです。</p>
          <p>
            教室での学びや探究の成果、ステージで放つ表現、社会とつながる企画。
            <br />
            そのすべての出発点にあるのは、誰かに与えられた課題ではなく、
            <br />
            自分の中から湧き上がった「やりたい！」という想いです。
          </p>
          <p>
            学校や年齢といった枠を越え、様々な人々が出会い、刺激し合い、
            <br />
            まだ見ぬ可能性を見つける場所へ。
          </p>
        </div>
      </div>
    </section>
  );
}
