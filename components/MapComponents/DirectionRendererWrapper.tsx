import React from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { plotColors } from "@/utils";

interface DirectionRendererWrapperProps {
  routes: google.maps.DirectionsResult[];
}

const DirectionRendererWrapper: React.FC<DirectionRendererWrapperProps> = ({
  routes,
}) => {
  return routes.map((route, index: number) => (
    <DirectionsRenderer
      directions={route}
      key={index}
      options={{
        markerOptions: {
          opacity: 0,
        },
        polylineOptions: {
          strokeColor: plotColors[index],
          strokeWeight: 5,
          strokeOpacity: 0.6,
        },
      }}
    />
  ));
};

export default DirectionRendererWrapper;
