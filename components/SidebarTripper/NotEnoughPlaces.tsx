import Lottie from "react-lottie";
import animationData from "@/lottie/not-found.json";
import React from "react";

export const NotEnoughPlaces = () => (
  <div className="flex flex-col justify-center items-center mt-4">
    <Lottie
      style={{ cursor: "default" }}
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={230}
      width={230}
    />
    <span>No routes selected</span>
  </div>
);
