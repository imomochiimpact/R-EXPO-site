import StageShape from "@/components/common/stageShape/StageShape";
import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import { STAGES } from "@/constants/stages";
import styles from "./StageOverview.module.css";

export default function StageOverview() {
  return (
    <section className={styles.section} aria-labelledby="stage-heading">
      <div className={styles.inner}>
        <SectionTitle id="stage-heading" label="STAGE" title="4つのステージ" tone="pink" />
        <p className={styles.lead}>
          R-EXPO 2027は、4つのステージで構成されます。各企画の詳細は公式アプリでご覧いただけます。
        </p>
        <ol className={styles.grid}>
          {STAGES.map((stage) => (
            <li key={stage.num} className={styles.card} data-tone={stage.tone} data-reveal="">
              <div className={styles.band}>
                <span className={styles.num}>{stage.num}</span>
                <h3 className={styles.name}>{stage.name}</h3>
                <StageShape shape={stage.shape} className={styles.shape} />
              </div>
              <div className={styles.body}>
                <p className={styles.catch}>{stage.catch}</p>
                <p className={styles.description}>{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
