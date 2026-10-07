import StageShape from "@/components/common/stageShape/StageShape";
import { STAGES } from "@/constants/stages";
import styles from "./StageList.module.css";

export default function StageList() {
  return (
    <div className={styles.list}>
      {STAGES.map((stage) => (
        <article
          key={stage.num}
          id={`stage-${stage.num}`}
          className={styles.stage}
          data-tone={stage.tone}
          data-shape={stage.shape}
          data-reveal=""
        >
          <div className={styles.panel}>
            <StageShape shape={stage.shape} className={styles.shape} />
          </div>
          <div>
            <h2 className={styles.heading}>
              <span className={styles.num}>{stage.num}</span>
              <span className={styles.name}>{stage.name}</span>
            </h2>
            <p className={styles.description}>{stage.description}</p>
            <p className={styles.chip}>企画・時間帯は決まり次第掲載します</p>
          </div>
        </article>
      ))}
    </div>
  );
}
