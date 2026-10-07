import Image from "next/image";
import FillButton from "@/components/common/fillButton/FillButton";
import { EVENT } from "@/constants/event";
import styles from "./LocationVenue.module.css";

export default function LocationVenue() {
  return (
    <section aria-labelledby="venue-heading">
      <div className={styles.grid}>
        <div className={styles.photo} data-reveal="">
          {EVENT.venueImage.src ? (
            <Image
              src={EVENT.venueImage.src}
              alt={EVENT.venueImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 560px"
              unoptimized
              className={styles.photoImage}
            />
          ) : (
            <span className={styles.photoEmpty}>会場外観の画像</span>
          )}
        </div>
        <div data-reveal="">
          <p className={styles.label}>VENUE</p>
          <h2 id="venue-heading" className={styles.name}>
            {EVENT.venue}
          </h2>
          <p className={styles.address}>{EVENT.address}</p>
          <div className={styles.links}>
            <FillButton href={EVENT.venueUrl} size="sm" external>
              会場公式サイト
            </FillButton>
            <FillButton href={EVENT.mapUrl} size="sm" external>
              Google マップで開く
            </FillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
