import Link from "next/link";
import { HISTORY } from "@/constants/history";
import styles from "./HistoryTabs.module.css";

type Props = {
  current: string;
};

export default function HistoryTabs({ current }: Props) {
  return (
    <nav aria-label="開催年">
      <ul className={styles.tabs}>
        {HISTORY.map((entry) => (
          <li key={entry.year}>
            <Link
              href={`/history/${entry.year}`}
              className={styles.tab}
              aria-current={entry.year === current ? "page" : undefined}
            >
              {entry.year}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
