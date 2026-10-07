import StageShape from "@/components/common/stageShape/StageShape";
import { STAGES } from "@/constants/stages";
import styles from "./StageColumns.module.css";

export default function StageColumns() {
  return (
    <ul className={styles.cols}>
      {STAGES.map((stage) => (
        <li key={stage.num} className={styles.item}>
          <a href={`#stage-${stage.num}`} className={styles.col} data-tone={stage.tone}>
            <StageShape shape={stage.shape} outline className={styles.shape} />
            <span className={styles.num}>{stage.num}</span>
            <span className={styles.name}>{stage.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
