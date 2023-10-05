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

  fetchQuery = async (callback: (options: TripmapProps[]) => void) => {
    try {
      const queryParameters = this.getQueryOptions();
      const res = await fetch(
        `/getParameters/place?lat=${queryParameters.lat}&lon=${queryParameters.lon}&q=${queryParameters.name}`,
        {
          method: "POST",
        },
      );
      res.json().then((result) => callback(result));
    } catch {
      return callback([]);
    }
  };
}
