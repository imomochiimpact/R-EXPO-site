import type { AccentTone } from "@/types/tone";
import styles from "./SectionTitle.module.css";

type Props = {
  id: string;
  label: string;
  title: string;
  tone?: AccentTone;
  size?: "md" | "sm";
};

export default function SectionTitle({ id, label, title, tone, size = "md" }: Props) {
  return (
    <div className={styles.wrap} data-size={size}>
      <p className={styles.label} data-tone={tone}>
        {tone && <span className={styles.bar} aria-hidden="true" />}
        {label}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}
