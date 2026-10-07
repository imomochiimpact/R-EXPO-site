import ArchivePreview from "@/components/top/archivePreview/ArchivePreview";
import ConceptIntro from "@/components/top/conceptIntro/ConceptIntro";
import EventSummary from "@/components/top/eventSummary/EventSummary";
import Hero from "@/components/top/hero/Hero";
import NewsList from "@/components/top/newsList/NewsList";
import PageLinks from "@/components/top/pageLinks/PageLinks";
import SupportCta from "@/components/top/supportCta/SupportCta";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <ConceptIntro /> */}
      <EventSummary />
      <SupportCta />
      <PageLinks />
      {/* <ArchivePreview /> */}
      <NewsList />
    </main>
  );
}
