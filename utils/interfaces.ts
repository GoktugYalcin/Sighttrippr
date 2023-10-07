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

export type SelectValueType = TripmapProps | GeonameProps | google.maps.Place;

export interface SelectWrapperProps {
  label?: string;
  fetchType: string;
  getOptionValue(item: GetOptionValue<SelectValueType>): string;
  getOptionLabel(item: GetOptionLabel<SelectValueType>): string;
  loadOptions(
    e: string,
    callback: (options: GeonameProps[] | PlaceProps[]) => void,
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

export type RewrittenDirectionResult = google.maps.DirectionsResult & {
  request: {
    origin: { location: google.maps.LatLng };
    destination: { location: google.maps.LatLng };
  };
};

export interface FetcherStateProps {
  city?: GeonameProps;
  places: PlaceProps[];
  selectedMarker?: PlaceProps;
  fetchedRoutes: RewrittenDirectionResult[];
  selectedRoute?: google.maps.DirectionsResult;
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

export interface PlaceProps {
  business_status: string;
  formatted_address: string;
  name: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
