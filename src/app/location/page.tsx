import type { Metadata } from "next";
import ComingSoon from "@/components/common/comingSoon/ComingSoon";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import LocationCar from "@/components/location/locationCar/LocationCar";
import LocationTransit from "@/components/location/locationTransit/LocationTransit";
import LocationVenue from "@/components/location/locationVenue/LocationVenue";
import { PAGE_OPEN } from "@/constants/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "アクセス",
};

export default function Page() {
  if (!PAGE_OPEN.location) {
    return (
      <main>
        <ComingSoon label="ACCESS" title="会場・アクセス" tone="green" />
      </main>
    );
  }

  return (
    <main>
      <PageHeader label="ACCESS" title="会場・アクセス" tone="green" />
      <div className={styles.body}>
        <LocationVenue />
        <div data-reveal="">
          <LocationTransit />
        </div>
        <div data-reveal="">
          <LocationCar />
        </div>
      </div>
    </main>
  );
}
