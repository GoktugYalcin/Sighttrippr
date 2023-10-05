import LatLng = google.maps.LatLng;
import { GoogleTypeCoord } from "@/utils/interfaces";

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
