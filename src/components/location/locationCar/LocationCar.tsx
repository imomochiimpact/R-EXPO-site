import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import { EVENT } from "@/constants/event";
import styles from "./LocationCar.module.css";

export default function LocationCar() {
  return (
    <section className={styles.section} aria-labelledby="car-heading">
      <SectionTitle id="car-heading" label="BY CAR" title="車でお越しの方" tone="green" size="sm" />
      <p className={styles.text}>{EVENT.access.car}</p>
    </section>
  );
}
