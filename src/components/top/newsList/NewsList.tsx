import Link from "next/link";
import { NEWS } from "@/constants/news";
import styles from "./NewsList.module.css";

const TOP_COUNT = 3;

export default function NewsList() {
  if (NEWS.length === 0) return null;

  return (
    <section className={styles.news} aria-labelledby="news-heading">
      <div className={styles.inner}>
        <div data-reveal="">
          <p className={styles.label}>NEWS</p>
          <h2 id="news-heading" className={styles.heading}>
            お知らせ
          </h2>
        </div>
        <div className={styles.listWrap} data-reveal="">
          <ul className={styles.list}>
            {NEWS.slice(0, TOP_COUNT).map((item) => (
              <li key={`${item.date}-${item.title}`}>
                {item.href ? (
                  <Link href={item.href} className={`${styles.item} ${styles.linked}`}>
                    <time className={styles.date}>{item.date}</time>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : (
                  <div className={styles.item}>
                    <time className={styles.date}>{item.date}</time>
                    <span className={styles.title}>{item.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
