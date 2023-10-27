import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setSelectedRoute } from "@/redux/slice/fetcherSlice";

import { FaArrowRight, FaCar, FaClock } from "react-icons/fa6";
import { generateGoogleMapsURL } from "@/utils";
import googleMap from "@react-google-maps/api/src/GoogleMap";
import { FaExternalLinkAlt } from "react-icons/fa";

const RouteList = () => {
  const dispatch = useAppDispatch();
  const { places, fetchedRoutes } = useAppSelector((store) => store.fetcher);
  return (
    <div className="max-h-[calc(80vh-185px)] overflow-scroll">
      {places.map((place, index: number) => {
        if (index < 1) {
          return undefined;
        } else {
          const prevPlace = places[index - 1];
          const decidedRoute = fetchedRoutes[index - 1];
          const routeLeg = decidedRoute?.routes[0].legs[0];

          return (
            <div
              className="flex flex-col gap-0"
              onClick={() => dispatch(setSelectedRoute(decidedRoute))}
              key={index}
            >
              <div className="flex w-full justify-center py-5 px-3 flex-col gap-2 cursor-pointer hover:bg-gray-100 mt-2 transition-colors border-b-gray-100 border-b-2 max-h-fit">
                <div className="gap-2 flex justify-start items-center text-lg">
                  <span>{prevPlace.name}</span>
                  <FaArrowRight />
                  <span>{place.name}</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <span className="flex gap-1 items-center text-yellow-600">
                    <FaClock /> {routeLeg?.distance?.text ?? ""}
                  </span>
                  <span className="text-slate-400">-</span>
                  <span className="flex gap-1 items-center text-green-700">
                    <FaCar /> {routeLeg?.duration?.text ?? ""}
                  </span>
                  <span className="text-slate-400">-</span>
                  <a
                    target="_blank"
                    href={generateGoogleMapsURL(decidedRoute)}
                    className="flex gap-1 items-center hover:underline text-blue-400"
                  >
                    Maps <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RouteList;
