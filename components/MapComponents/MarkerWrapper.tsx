import React from "react";
import { Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSelectedMarker } from "@/redux/slice/fetcherSlice";

const MarkerWrapper = () => {
  const dispatch = useAppDispatch();
  const { places } = useAppSelector((store) => store.fetcher);
  return places.map((place, index) => (
    <Marker
      position={place?.geometry.location}
      onClick={(e) => {
        dispatch(setSelectedMarker(place));
      }}
      key={index}
    ></Marker>
  ));
};

export default MarkerWrapper;
