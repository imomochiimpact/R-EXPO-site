import Image from "next/image";
import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import { fetchBuildData } from "@/lib/buildData";
import type { Greeting } from "@/types/greeting";
import styles from "./Greetings.module.css";

function isGreeting(v: unknown): v is Greeting {
  if (typeof v !== "object" || v === null) return false;
  const g = v as Record<string, unknown>;
  return (
    typeof g.id === "number" &&
    typeof g.name === "string" &&
    typeof g.role === "string" &&
    typeof g.body === "string"
  );
}

function parseGreetings(json: unknown): Greeting[] | null {
  const list = (json as { greetings?: unknown } | null)?.greetings;
  if (!Array.isArray(list)) return null;
  const valid = list.filter(isGreeting);
  if (list.length > 0 && valid.length === 0) return null;
  return valid;
}

export default async function Greetings() {
  const greetings = await fetchBuildData({
    key: "greetings",
    path: "/greeting?event=rexpo",
    parse: parseGreetings,
  });
  if (!greetings || greetings.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="greeting-heading">
      <div className={styles.inner}>
        <SectionTitle id="greeting-heading" label="GREETING" title="開催にあたって" tone="pink" />
        <div className={styles.list}>
          {greetings.map((g) => (
            <article key={g.id} className={styles.card} data-reveal="">
              <div className={styles.head}>
                {g.photo_url && (
                  <div className={styles.photoFrame}>
                    <Image
                      src={g.photo_url}
                      alt=""
                      width={120}
                      height={120}
                      unoptimized
                      className={styles.photo}
                    />
                  </div>
                )}
                <h3 className={styles.heading}>
                  <span className={styles.role}>{g.role}</span>
                  <span className={styles.name}>{g.name}</span>
                </h3>
              </div>
              <p className={styles.body}>{g.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
