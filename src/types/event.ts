export type EventInfo = {
  name: string;
  catch: string;
  date: string;
  // time: string;
  admission: string;
  venue: string;
  venueUrl: string;
  venueImage: {
    src: string;
    alt: string;
  };
  address: string;
  access: {
    train: string;
    car: string;
  };
  mapEmbedUrl: string;
  mapUrl: string;
  routeEmbedUrl: string;
  routeUrl: string;
};
