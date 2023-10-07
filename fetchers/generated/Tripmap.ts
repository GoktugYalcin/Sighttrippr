import { FetcherClass } from "@/fetchers/FetcherClass";
import { TripmapProps } from "@/utils/interfaces";

export class Tripmap extends FetcherClass {
  constructor(lat: string | null, lon: string | null, q: string | null) {
    super({
      endpoint: "https://api.opentripmap.com/0.1/en/places/autosuggest",
      queryOptions: {
        apikey: process.env.OPENTRIPMAP_API_KEY,
        radius: 30_000,
        limit: 20,
        offset: 0,
        lon: lon,
        lat: lat,
        name: (q || "").length >= 3 ? q : undefined,
        rate: 3,
        format: "json",
        lang: "en",
        kinds: "museums,cultural,historic,natural",
      },
    });
  }
}
