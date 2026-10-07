import RevealCard from "@/components/common/revealCard/RevealCard";
import { TOP_LINKS } from "@/constants/top";
import styles from "./PageLinks.module.css";

export default function PageLinks() {
  return (
    <section className={styles.section} aria-label="ページ一覧">
      <ul className={styles.list}>
        {TOP_LINKS.map((link, i) => (
          <li key={link.href} data-reveal="">
            <RevealCard
              href={link.href}
              num={String(i + 1).padStart(2, "0")}
              title={link.title}
              sub={link.sub}
              tone={link.tone}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
