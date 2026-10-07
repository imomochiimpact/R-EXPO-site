import Link from "next/link";
import { TOP_ARCHIVE } from "@/constants/top";
import styles from "./ArchivePreview.module.css";

export default function ArchivePreview() {
  return (
    <section className={styles.archive} aria-labelledby="archive-heading">
      <div className={styles.inner}>
        <div className={styles.head} data-reveal="">
          <h2 id="archive-heading" className={styles.label}>
            ARCHIVE {TOP_ARCHIVE.year}
          </h2>
          <Link href={`/history/${TOP_ARCHIVE.year}`} className={styles.more}>
            すべて見る →
          </Link>
        </div>
        <ul className={styles.grid}>
          {TOP_ARCHIVE.photos.map((label) => (
            <li key={label} className={styles.photo} data-reveal="">
              <span className={styles.placeholder}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
