import FillButton from "@/components/common/fillButton/FillButton";
import { EVENT } from "@/constants/event";
import styles from "./EventSummary.module.css";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const weekdayOf = (date: string) => {
  const [y, m, d] = date.split(".").map(Number);
  if (!y || !m || !d) return "";
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
};

export default function EventSummary() {
  const weekday = weekdayOf(EVENT.date);

  return (
    <section className={styles.summary} aria-label="開催概要">
      <div className={styles.inner}>
        <div data-reveal="">
          <p className={styles.label}>DATE</p>
          <p className={styles.date}>
            {EVENT.date}
            {weekday && <span className={styles.weekday}>{weekday}</span>}
          </p>
        </div>
        <div data-reveal="">
          <p className={styles.label}>VENUE</p>
          <p className={styles.venue}>{EVENT.venue}</p>
          <p className={styles.note}>{EVENT.admission}</p>
        </div>
        <div data-reveal="">
          <FillButton href="/location">会場・アクセス</FillButton>
        </div>
      </div>
    </section>
  );
}
