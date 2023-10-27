import LatLng = google.maps.LatLng;
import {
  FetcherStateProps,
  GoogleTypeCoord,
  RewrittenDirectionResult,
} from "@/utils/interfaces";
import LatLngLiteral = google.maps.LatLngLiteral;

export const getCountryFlagEmoji = (countryCode: string): string => {
  try {
    const countryCodeUpperCase = countryCode.toUpperCase();
    const offset = 127397;
    return String.fromCodePoint(
      ...countryCodeUpperCase
        .split("")
        .map((char) => char.charCodeAt(0) + offset),
    );
  } catch (e) {
    return "";
  }
};

export const plotColors = [
  "#ccd5ae",
  "#d4a373",
  "#06d6a0",
  "#faedcd",
  "#ffd166",
  "#e63946",
];

export const defaultCenter: GoogleTypeCoord = {
  lat: 41.015137,
  lng: 28.97953,
};

export const generateGoogleMapsURL = (
  route: RewrittenDirectionResult,
): string => {
  const request = route?.request;
  if (!request) return "";

  const { origin, destination } = request;
  const encodedOrigin = encodeURIComponent(
    `${origin.location.lat()},${origin.location.lng()}`,
  );
  const encodedDestination = encodeURIComponent(
    `${destination.location.lat()},${destination.location.lng()}`,
  );
  
  return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}`;
};
