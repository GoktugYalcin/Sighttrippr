import { FetcherClass } from "@/fetchers/FetcherClass";

export class Geonames extends FetcherClass {
  constructor(query: string | null) {
    super({
      endpoint: "http://api.geonames.org/searchJSON",
      queryOptions: {
        name: query,
        maxRows: 50,
        username: process.env.GEONAMES_USERNAME,
        style: "SHORT",
        name_startsWith: query,
        featureCodes: "PPLA,PPLC",
        cities: "cities15000",
      },
    });
  }
}
