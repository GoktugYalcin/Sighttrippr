"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { defaultCenter } from "@/utils";
import { createRouteObject, mapStyles } from "@/utils/mapUtils";
import MarkerWrapper from "@/components/MapComponents/MarkerWrapper";
import DirectionRendererWrapper from "@/components/MapComponents/DirectionRendererWrapper";
import { PlaceProps, TripmapProps } from "@/utils/interfaces";
import { setFetchedRoutes } from "@/redux/slice/fetcherSlice";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function GoogleMapWrapper() {
  const dispatch = useAppDispatch();
  const { city, places } = useAppSelector((store) => store.fetcher);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const centerPoint = {
    lat: parseFloat(city?.lat!) || defaultCenter.lat,
    lng: parseFloat(city?.lng!) || defaultCenter.lng,
  };
  const mapRef = useRef<any>(null);
  useEffect(() => {
    if (places.length > 1) {
      const routesPromise = places.map((place: PlaceProps, index: number) => {
        if (index < 1) {
          return undefined;
        } else {
          const prevPlace = places[index - 1];
          const directionsService = new google.maps.DirectionsService();

          return directionsService.route(
            createRouteObject(prevPlace, place),
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                return result;
              }
            },
          );
        }
      });

      Promise.all(routesPromise).then((routes) => {
        dispatch(setFetchedRoutes(routes.slice(1)));
      });
    } else {
      dispatch(setFetchedRoutes([]));
    }
  }, [places]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
      }}
      center={centerPoint}
      zoom={11}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      <MarkerWrapper />
      <DirectionRendererWrapper />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapWrapper);
