import type { HistoryEntry } from "@/types/history";
import LoaderImage from "@/components/common/loaderImage/LoaderImage";
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
      <div className={styles.overview}>
        <div className={styles.summary} data-reveal="">
          {entry.summary.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>

        <dl className={styles.stats} data-reveal="">
          {entry.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className={styles.photos}>
        {entry.photos.map((photo, i) => {
          const wideIndex = entry.photos.slice(0, i).filter((p) => p.wide).length;
          return (
            <li
              key={photo.src ?? i}
              className={styles.photo}
              data-wide={photo.wide ? (wideIndex % 2 === 0 ? "left" : "right") : undefined}
              data-reveal=""
            >
              {photo.src ? (
                <figure className={styles.figure}>
                  <LoaderImage
                    src={photo.src}
                    alt={photo.label ?? `${entry.title}の様子`}
                    fill
                    sizes={photo.wide ? "(max-width: 979px) 100vw, 66vw" : "(max-width: 479px) 100vw, (max-width: 979px) 50vw, 33vw"}
                    unoptimized
                    className={styles.photoImage}
                  />
                  {photo.label && <figcaption className={styles.caption}>{photo.label}</figcaption>}
                </figure>
              ) : (
                <span className={styles.photoEmpty}>{photo.label}</span>
              )}
            </li>
          );
        })}
      </ul>
      {entry.photosNote && (
        <p className={styles.photosNote} data-reveal="">
          {entry.photosNote}
        </p>
      )}
    </section>
  );
}
