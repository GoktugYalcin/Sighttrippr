"use client";

import { createSlice, current } from "@reduxjs/toolkit";
import { FetcherStateProps } from "@/utils/interfaces";
import { act } from "react-dom/test-utils";

const initialState: FetcherStateProps = {
  city: undefined,
  places: [],
  selectedMarker: undefined,
  fetchedRoutes: [],
  selectedRoute: undefined,
};

export const fetcherSlice = createSlice({
  name: "fetcher",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    updatePlaces: (state, action) => {
      state.places = [...current(state.places), ...action.payload] as never[];
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
    setFetchedRoutes: (state, action) => {
      state.fetchedRoutes = action.payload;
    },
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const {
  setCity,
  setPlaces,
  setSelectedMarker,
  setFetchedRoutes,
  setSelectedRoute,
} = fetcherSlice.actions;

export default fetcherSlice.reducer;
