import React from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useAppSelector } from "@/redux/store";

const DirectionRendererWrapper: React.FC = () => {
  const { selectedRoute } = useAppSelector((store) => store.fetcher);
  return (
    !!selectedRoute && (
      <DirectionsRenderer
        directions={selectedRoute}
        options={{
          markerOptions: {
            opacity: 0,
          },
          polylineOptions: {
            strokeColor: "#3383ab",
            strokeWeight: 5,
            strokeOpacity: 1,
          },
        }}
      />
    )
  );
};

export default DirectionRendererWrapper;
