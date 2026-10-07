import FillButton from "@/components/common/fillButton/FillButton";
import SectionTitle from "@/components/common/sectionTitle/SectionTitle";
import { EVENT } from "@/constants/event";
import LocationMap from "../locationMap/LocationMap";
import LocationRoute from "../locationRoute/LocationRoute";
import styles from "./LocationTransit.module.css";

export default function LocationTransit() {
  return (
    <section className={styles.section} aria-labelledby="transit-heading">
      <SectionTitle id="transit-heading" label="BY TRAIN" title="公共交通機関でお越しの方" tone="green" size="sm" />
      <p className={styles.nearest}>{EVENT.access.train}</p>
      <div className={styles.walk}>
        <h3 className={styles.walkHeading}>東札幌駅から会場まで（徒歩約10分）</h3>
        <div className={styles.walkBody}>
          <LocationMap src={EVENT.routeEmbedUrl} title="東札幌駅から札幌コンベンションセンターまでの徒歩ルート" />
          <div>
            <p className={styles.walkText}>
              地下鉄東西線「東札幌駅」の出口から、札幌コンベンションセンターまで徒歩約10分です。
            </p>
            <FillButton href={EVENT.routeUrl} variant="teal" size="sm" external className={styles.walkLink}>
              Googleマップで経路を見る
            </FillButton>
          </div>
        </div>
      </div>

      <div className={styles.walk}>
        <h3 className={styles.walkHeading}>新千歳空港から</h3>
        <p className={styles.text}>
        新千歳空港からJR札幌駅経由もしくはJR新札幌駅経由でお越しいただけます。どちらもトータルの所要時間は約60分です。地下鉄東西線「東札幌駅」からはおよそ徒歩で約10分です。
        </p>
        <LocationRoute />
      </div>
    </section>
  );
}
