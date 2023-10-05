import { ConstructorProps, IFetcherClass } from "@/utils/interfaces";
import { QueryOption } from "@/utils/types";

export class FetcherClass implements IFetcherClass {
  private readonly _endpoint: string = "";
  private readonly _queryOptions: QueryOption = {};

  constructor({ endpoint, queryOptions }: ConstructorProps) {
    this._endpoint = endpoint;
    this._queryOptions = queryOptions || {};
  }

  parseQueryOptions(options: QueryOption) {
    return Object.entries(options || this._queryOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  getFullURL() {
    return `${this._endpoint}?${this.parseQueryOptions(
      this.getQueryOptions(),
    )}`;
  }

  getEndpoint() {
    return this._endpoint;
  }

  getQueryOptions() {
    return this._queryOptions;
  }

  setQueryOptions(newQueryOptions: QueryOption) {
    return { ...this._queryOptions, ...newQueryOptions };
  }
}
