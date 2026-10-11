import Link from "next/link";
import { LATEST_HISTORY } from "@/constants/history";
import ArchiveMarquee from "./ArchiveMarquee";
import styles from "./ArchivePreview.module.css";

export default function ArchivePreview() {
  const { year, title, photos } = LATEST_HISTORY;
  const previews = photos.filter((photo) => photo.src);

  return (
    <section className={styles.archive} aria-labelledby="archive-heading">
      <div className={styles.inner}>
        <div className={styles.head} data-reveal="">
          <h2 id="archive-heading" className={styles.label}>
            ARCHIVE {year}
          </h2>
          <Link href={`/history`} className={styles.more}>
            過去開催の記録を見る →
          </Link>
        </div>
      </div>
      <ArchiveMarquee photos={previews} href={`/history/${year}`} title={title} />
    </section>
  );
}
