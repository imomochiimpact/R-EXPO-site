import Image from "next/image";
import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import HeaderNav from "../headerNav/HeaderNav";
import MobileMenu from "../mobileMenu/MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <TransitionLink href="/" origin="self" className={styles.logo} data-transition-edge>
        <Image
          src="/logo/LogoH_white.svg"
          alt="R-EXPO 2027"
          width={5587}
          height={1377}
          unoptimized
          className={styles.logoImage}
          data-header-logo
        />
      </TransitionLink>
      <HeaderNav />
      <MobileMenu />
    </header>
  );
}
