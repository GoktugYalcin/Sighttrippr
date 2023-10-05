"use client";

import { createSlice, current } from "@reduxjs/toolkit";
import { FetcherStateProps } from "@/utils/interfaces";

const initialState: FetcherStateProps = {
  city: null,
  places: [],
  selectedMarker: null,
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
  },
});

export const { setCity, setPlaces, setSelectedMarker } = fetcherSlice.actions;

export default fetcherSlice.reducer;
