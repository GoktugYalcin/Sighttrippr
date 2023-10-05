"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { defaultCenter } from "@/utils";
import { createRouteObject, mapStyles } from "@/utils/mapUtils";
import MarkerWrapper from "@/components/MapComponents/MarkerWrapper";
import DirectionRendererWrapper from "@/components/MapComponents/DirectionRendererWrapper";
import { TripmapProps } from "@/utils/interfaces";
import { InfoWindow } from "google-maps-react";
import { setSelectedMarker } from "@/redux/slice/fetcherSlice";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function GoogleMapWrapper() {
  const dispatch = useAppDispatch();
  const [selectedRoutes, setSelectedRoutes] = useState<any>([]);
  const { city, places, selectedMarker } = useAppSelector(
    (store) => store.fetcher,
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDrwmXyDHTbPZYzC_lR_V4FRY9H2OOaRKo",
  });
  const centerPoint = {
    lat: parseFloat(city?.lat!) || defaultCenter.lat,
    lng: parseFloat(city?.lng!) || defaultCenter.lng,
  };
  const mapRef = useRef<any>(null);
  useEffect(() => {
    if (places.length > 1) {
      places.map((place: TripmapProps, index: number) => {
        if (index < 1) {
          return undefined;
        } else {
          const prevPlace = places[index - 1];
          const directionsService = new google.maps.DirectionsService();

          directionsService.route(
            createRouteObject(prevPlace, place),
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                console.log(result);
                setSelectedRoutes([...selectedRoutes, result]);
              }
            },
          );
        }
      });
    } else {
      setSelectedRoutes([]);
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
        styles: mapStyles,
      }}
      center={centerPoint}
      zoom={11}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {selectedMarker && (
        <InfoWindow
          marker={selectedMarker as google.maps.Marker}
          position={{
            lat: selectedMarker?.point?.lat!,
            lng: selectedMarker?.point?.lon!,
          }}
          onCloseClick={() => dispatch(setSelectedMarker(null))}
          google={window.google}
          map={mapRef.current}
          visible={!!selectedMarker}
        >
          <div>
            <h2>"benim adım garavel"</h2>
          </div>
        </InfoWindow>
      )}
      <MarkerWrapper />
      <DirectionRendererWrapper routes={selectedRoutes} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapWrapper);
