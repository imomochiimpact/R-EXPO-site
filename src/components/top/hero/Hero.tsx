import Image from "next/image";
import { EVENT } from "@/constants/event";
import HeroObserver from "./HeroObserver";
import styles from "./Hero.module.css";
import { HERO_IMAGE } from "@/constants/top";

export default function Hero() {
  const [line1, line2] = EVENT.catch.split("\n");

  return (
    <section className={styles.hero}>
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        sizes="100vw"
        unoptimized
        className={styles.bgImage}
      />
      <div className={styles.observer}>
        <HeroObserver />
      </div>


      <div className={styles.band}>
        <span className={styles.bandText}>Ritsumeikan Keisho showcase</span>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <Image
            src="/logo/LogoH_white.svg"
            alt={EVENT.name}
            width={5587}
            height={1377}
            unoptimized
            className={styles.wordmark}
          />
        </h1>
        {/* <p className={styles.catch}>
          {line1}
          <br />
          {line2}
        </p> */}
      </div>
    </section>
  );
}
