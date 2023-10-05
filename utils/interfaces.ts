import { GetOptionLabel, GetOptionValue } from "react-select";
import { QueryOption } from "@/utils/types";

export interface GoogleTypeCoord {
  lat: number;
  lng: number;
}

export interface routeObjectGeneratorProps {
  origin: GoogleTypeCoord;
  destination: GoogleTypeCoord;
  travelMode: google.maps.TravelMode;
}

export interface SelectWrapperProps {
  label: string;
  fetchType: string;
  getOptionValue(item: GetOptionValue<TripmapProps | GeonameProps>): string;
  getOptionLabel(item: GetOptionLabel<TripmapProps | GeonameProps>): string;
  loadOptions(
    e: string,
    callback: (options: GeonameProps[] | TripmapProps[]) => void,
  ): void;
  value: any;
}

export interface IFetcherClass {
  parseQueryOptions(options: QueryOption): string;
  getFullURL(): string;
  getEndpoint(): string;
  getQueryOptions(): QueryOption;
  setQueryOptions(newQueryOptions: QueryOption): QueryOption;
}

export interface ConstructorProps {
  endpoint: string;
  queryOptions?: QueryOption;
}

export interface GeonameProps {
  lng?: string;
  geonameId?: number;
  countryCode?: string;
  name?: string;
  toponymName?: string;
  lat?: string;
  fcl?: string;
  fcode?: string;
}

export interface FetcherStateProps {
  city: GeonameProps | null;
  places: TripmapProps[];
  selectedMarker: TripmapProps | null;
}

export interface IFetcherClass {
  parseQueryOptions(options: QueryOption): string;
  getFullURL(): string;
  getEndpoint(): string;
  getQueryOptions(): QueryOption;
  setQueryOptions(newQueryOptions: QueryOption): QueryOption;
}

export interface TripmapProps {
  dist?: number;
  kinds_?: string;
  name?: string;
  point?: {
    lat?: number;
    lon?: number;
  };
  rate?: number;
  wikidata?: string;
  xid?: string;
  osm?: string;
}
