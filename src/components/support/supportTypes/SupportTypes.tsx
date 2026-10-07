import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import type { AccentTone } from "@/types/tone";
import styles from "./SupportTypes.module.css";

type Plan = {
  target?: string;
  price?: number;
  benefit: string;
};

const TYPES: { name: string; tone: AccentTone; plans: Plan[] }[] = [
  {
    name: "寄付",
    tone: "blue",
    plans: [
      { target: "法人向け", price: 50000, benefit: "4口以上で「R-EXPO」にてブース出展が可能" },
      { target: "個人向け", price: 10000, benefit: "20口以上で「R-EXPO」にてブース出展が可能" },
    ],
  },
  {
    name: "協賛",
    tone: "pink",
    plans: [{ price: 5000, benefit: "公式パンフレットへの広告掲載が可能" }],
  },
  {
    name: "協力",
    tone: "green",
    plans: [{ benefit: "ポスター掲示やチラシ配布等が可能" }],
  },
];

export default function SupportTypes() {
  return (
    <section className={styles.section} aria-labelledby="support-types-heading">
      <div className={styles.inner}>
        <SectionTitle id="support-types-heading" label="TYPES" title="支援タイプ" />
        <ul className={styles.list}>
          {TYPES.map((type) => (
            <li key={type.name} className={styles.card} data-tone={type.tone} data-reveal="">
              <h3 className={styles.name}>{type.name}</h3>
              {type.plans.map((plan) => (
                <dl key={plan.benefit} className={styles.plan}>
                  {plan.target && <dt className={styles.target}>{plan.target}</dt>}
                  {plan.price && (
                    <dd className={styles.price}>
                      <span className={styles.unitBefore}>一口</span>
                      {plan.price.toLocaleString("ja-JP")}
                      <span className={styles.unitAfter}>円</span>
                    </dd>
                  )}
                  <dd className={styles.benefit}>{plan.benefit}</dd>
                </dl>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
