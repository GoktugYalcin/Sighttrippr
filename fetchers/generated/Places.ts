import { FetcherClass } from "@/fetchers/FetcherClass";

export class Places extends FetcherClass {
  constructor(query: string, coords: { lat: string; lng: string }) {
    super({
      endpoint: "https://maps.googleapis.com/maps/api/place/textsearch/json",
      queryOptions: {
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        query: `${encodeURIComponent(query)}+point+of+interest`,
        radius: 10_000,
        type: "point_of_interest|landmark",
        location: `${coords.lat},${coords.lng}`,
      },
    });
  }
}
