import Image from "next/image";
import Link from "next/link";
import HeaderNav from "../headerNav/HeaderNav";
import MobileMenu from "../mobileMenu/MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo/LogoH_white.svg"
          alt="R-EXPO 2027"
          width={5587}
          height={1377}
          unoptimized
          className={styles.logoImage}
        />
      </Link>

      <HeaderNav />
      <MobileMenu />
    </header>
  );
}
