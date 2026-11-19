export const SITE_NAME = "Montévane";

// Boutique addresses — keep each identical to its Google Business Profile
// (name, address, phone must match everywhere for local SEO). The first one is
// the main address used in structured data.
export type StoreLocation = {
  city: string;
  street: string;
  postalCode: string;
  locality: string;
  region?: string;
  country: string;
  countryName: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  embedUrl: string;
};

const maps = (q: string) => ({
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
  embedUrl: `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent(q).replace(/%20/g, "+")}!6i17`,
});

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    city: "Miami",
    street: "4000 NE 1st Avenue",
    postalCode: "33137",
    locality: "Miami",
    region: "FL",
    country: "US",
    countryName: "United States",
    lat: 25.8133,
    lng: -80.1937,
    ...maps("4000 NE 1st Avenue, Miami, FL 33137"),
  },
];

export const STORE_ADDRESS = STORE_LOCATIONS[0];
export const MAP_EMBED_URL = STORE_ADDRESS.embedUrl;
export const MAPS_URL = STORE_ADDRESS.mapsUrl;

/** "Miami, FL 33137" (or "98000 Monaco" for an address without a region) */
export function cityLine(l: StoreLocation): string {
  return l.region ? `${l.locality}, ${l.region} ${l.postalCode}` : `${l.postalCode} ${l.locality}`;
}

