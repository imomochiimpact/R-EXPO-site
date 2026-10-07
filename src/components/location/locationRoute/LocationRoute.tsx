import styles from "./LocationRoute.module.css";

type Step =
  | { kind: "ride"; line: string; dir?: string; min: number }
  | { kind: "transfer"; at: string; to: string };

const ROUTES: { label: string; steps: Step[] }[] = [
  {
    label: "札幌駅・大通駅経由",
    steps: [
      { kind: "ride", line: "JR快速", min: 37 },
      { kind: "transfer", at: "JR札幌駅", to: "地下鉄南北線" },
      { kind: "ride", line: "地下鉄南北線", dir: "真駒内方面", min: 2 },
      { kind: "transfer", at: "大通駅", to: "東西線" },
      { kind: "ride", line: "地下鉄東西線", dir: "新さっぽろ方面", min: 6 },
    ],
  },
  {
    label: "新札幌駅経由",
    steps: [
      { kind: "ride", line: "JR快速", min: 30 },
      { kind: "transfer", at: "JR新札幌駅", to: "地下鉄東西線" },
      { kind: "ride", line: "地下鉄東西線", dir: "宮の沢方面", min: 17 },
    ],
  },
];

export default function LocationRoute() {
  return (
    <section className={styles.section} aria-label="新千歳空港から会場までの経路図">
      {/* <SectionTitle id="route-heading" label="ROUTE" title="新千歳空港からのアクセス" /> */}

      <p className={styles.hint}>横にスクロールできます →</p>
      <div className={styles.scroller} tabIndex={0} role="region" aria-label="経路図（横スクロール）">
      <div className={styles.flow}>
        <div className={`${styles.node} ${styles.station} ${styles.start}`}>
          <span className={styles.small}>JR</span>
          <strong className={styles.strong}>新千歳空港駅</strong>
        </div>

        <div className={styles.routes}>
          {ROUTES.map((route) => (
            <div key={route.label} className={styles.routeWrap}>
              <p className={styles.routeLabel}>{route.label}</p>
              <ol className={styles.route} aria-label={route.label}>
                {route.steps.map((step, i) =>
                  step.kind === "ride" ? (
                    <li key={i} className={`${styles.node} ${styles.ride}`}>
                      <span className={styles.small}>{step.line}</span>
                      {step.dir && <span className={styles.small}>{step.dir}</span>}
                      <span className={styles.time}>
                        <span className={styles.min}>{step.min}</span>分
                      </span>
                    </li>
                  ) : (
                    <li key={i} className={`${styles.node} ${styles.transfer}`}>
                      <span>
                        <strong className={styles.strong}>{step.at}</strong>で
                      </span>
                      <span>
                        <strong className={styles.strong}>{step.to}</strong>に
                      </span>
                      <span>乗り換え</span>
                    </li>
                  ),
                )}
              </ol>
            </div>
          ))}
        </div>

        <div className={`${styles.node} ${styles.station}`}>
          <span className={styles.small}>地下鉄東西線</span>
          <strong className={styles.strong}>東札幌駅</strong>
        </div>

        <div className={`${styles.node} ${styles.ride}`}>
          <span className={styles.small}>徒歩</span>
          <span className={styles.time}>
            <span className={styles.min}>10</span>分
          </span>
        </div>

        <div className={`${styles.node} ${styles.goal}`}>
          <strong className={styles.goalName}>
            <span>札幌コンベンション</span>
            <span>センター</span>
          </strong>
          <span className={styles.goalEn}>SAPPORO CONVENTION CENTER</span>
        </div>
      </div>
      </div>
    </section>
  );
}
