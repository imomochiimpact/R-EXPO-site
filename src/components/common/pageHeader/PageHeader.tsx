import type { ReactNode } from "react";
import type { AccentTone } from "@/types/tone";
import styles from "./PageHeader.module.css";

type Props = {
  label: string;
  title: string;
  tone: AccentTone;
  lead?: string;
  extra?: ReactNode;
  children?: ReactNode;
};

export default function PageHeader({ label, title, tone, lead, extra, children }: Props) {
  return (
    <section className={styles.header} data-tone={tone}>
      <div className={styles.inner}>
        <p className={styles.label}>
          <span className={styles.bar} aria-hidden="true" />
          {label}
        </p>
        <h1 className={styles.title}>
          <span className={styles.titleText}>{title}</span>
        </h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {extra}
      </div>
      {children}
    </section>
  );
}
