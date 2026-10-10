import Image from "next/image";
import type { HistoryEntry } from "@/types/history";
import styles from "./HistoryDetail.module.css";

type Props = {
  entry: HistoryEntry;
};

export default function HistoryDetail({ entry }: Props) {
  return (
    <section className={styles.section} aria-labelledby="history-heading">
      <h2 id="history-heading" className={styles.heading} data-reveal="">
        <span className={styles.year}>{entry.year}</span>
        <span className={styles.title}>{entry.title}</span>
      </h2>
      <p className={styles.summary} data-reveal="">
        {entry.summary}
      </p>


      <dl className={styles.stats} data-reveal="">
        {entry.stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statLabel}>{stat.label}</dt>
            <dd className={styles.statValue}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <ul className={styles.photos}>
        {entry.photos.map((photo) => (
          <li key={photo.label} className={styles.photo} data-wide={photo.wide ? "true" : undefined} data-reveal="">
            {photo.src ? (
              <Image src={photo.src} alt={photo.label} fill sizes="(max-width: 767px) 100vw, 50vw" unoptimized className={styles.photoImage} />
            ) : (
              <span className={styles.photoEmpty}>{photo.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
