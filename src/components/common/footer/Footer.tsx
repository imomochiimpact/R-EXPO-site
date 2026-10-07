import Image from "next/image";
import FillButton from "@/components/common/fillButton/FillButton";
import { EXTERNAL_LINKS } from "@/constants/links";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Image
            src="/logo/LogoH.svg"
            alt="R-EXPO 2027"
            width={5587}
            height={1377}
            unoptimized
            className={styles.logoImage}
          />
          <p className={styles.org}>立命館慶祥中学校・高等学校 行事運営委員会</p>
        </div>
        <div className={styles.buttons}>
          <FillButton href={EXTERNAL_LINKS.school} size="sm" external>
            学校公式サイト
          </FillButton>
          <FillButton href={EXTERNAL_LINKS.instagram} size="sm" external>
            Instagram
          </FillButton>
        </div>
        <small className={styles.credit}>© Tsubasa Takayama, R-EXPO 2027</small>
      </div>
    </footer>
  );
}
