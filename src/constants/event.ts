import type { EventInfo } from "@/types/event";

export const EVENT: EventInfo = {
  name: "R-EXPO 2027",
  catch: "まだみぬ個性を\n映し出せ",
  date: "2027.2.11",
  admission: "入場には、事前の来場予約が必要です。",
  venue: "札幌コンベンションセンター",
  venueUrl: "https://www.sora-scc.jp/",
  venueImage: {
    src: "https://r-expo.site/common/location.webp",
    alt: "札幌コンベンションセンターの外観",
  },
  address: "〒003-0006 札幌市 白石区東札幌6条1丁目1-1",
  access: {
    train: "地下鉄東西線「東札幌駅」下車、徒歩10分",
    car: "駐車可能な台数に限りがありますため、当日は公共交通機関でのご来場をお願いいたします。また、混雑緩和のため、送迎時等に会場周辺での駐車・停車はご遠慮いただきますよう併せてご協力をお願いいたします。",
  },
  mapEmbedUrl: "https://www.google.com/maps?q=札幌コンベンションセンター&output=embed",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=札幌コンベンションセンター",
  routeEmbedUrl: "https://www.google.com/maps?saddr=東札幌駅&daddr=札幌コンベンションセンター&dirflg=w&output=embed",
  routeUrl: "https://www.google.com/maps/dir/?api=1&origin=東札幌駅&destination=札幌コンベンションセンター&travelmode=walking",
};
