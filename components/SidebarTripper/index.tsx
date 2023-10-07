"use client";

import React from "react";
import Lottie from "react-lottie";
import SelectWrapper from "@/components/SelectWrapper";
import { getCountryFlagEmoji } from "@/utils";
import { HiChevronUpDown } from "react-icons/hi2";
import { useAppSelector } from "@/redux/store";
import debounce from "lodash.debounce";
import { GetOptionLabel, GetOptionValue } from "react-select";
import { GeonameProps, PlaceProps, TripmapProps } from "@/utils/interfaces";
import { NotEnoughPlaces } from "@/components/SidebarTripper/NotEnoughPlaces";
import RouteList from "@/components/SidebarTripper/RouteList";

const SidebarTripper = () => {
  const { city, places } = useAppSelector((state) => state.fetcher);

  return (
    <section className="flex flex-col absolute left-0 z-10 w-1/3 min-w-[400px] shadow-lg gap-[20px] m-2.5 items-center rounded-2xl">
      <div
        aria-label="header of sidebar"
        className="flex w-full p-4 bg-white justify-between items-center gap-12 rounded-2xl"
      >
        <div className="flex justify-start items-center gap-[20px]">
          <h1 className="text-2xl bg-gradient-to-tr from-green-400 via-cyan-900 to-blue-500 bg-clip-text text-transparent">
            📍Sighttrippr
          </h1>
          <span className="bg-gray-800 px-1 py-1 rounded-full text-slate-200 text-xl cursor-pointer">
            <HiChevronUpDown />
          </span>
        </div>
        <div
          aria-label="content of sidebar"
          className="px-2 flex flex-col gap-5 flex-1"
        >
          <SelectWrapper
            fetchType={"city"}
            value={city}
            getOptionLabel={(item: GetOptionLabel<GeonameProps>) =>
              `${(item as GeonameProps).toponymName} ${getCountryFlagEmoji(
                (item as GeonameProps).countryCode!,
              )}` || ""
            }
            getOptionValue={(item: GetOptionLabel<GeonameProps>) =>
              (item as GeonameProps)?.geonameId?.toString()!
            }
            loadOptions={debounce(async (e, callback) => {
              try {
                const res = await fetch(`/getParameters/city?q=${e}`, {
                  method: "POST",
                });
                res.json().then((result_1) => callback(result_1));
              } catch {
                return callback([]);
              }
            }, 750)}
          />
        </div>
      </div>
      {!!city?.name && (
        <div className="w-full bg-white p-4 rounded-2xl">
          <SelectWrapper
            label={"Place"}
            fetchType={"place"}
            value={places}
            getOptionLabel={(item) => item.name}
            getOptionValue={(
              option: GetOptionValue<PlaceProps | GeonameProps>,
            ) => (option as unknown as PlaceProps).place_id! ?? null}
            loadOptions={debounce(async (e, callback) => {
              try {
                const res = await fetch(
                  `/getParameters/places?q=${e}&lat=${city.lat}&lng=${city.lng}`,
                  {
                    method: "POST",
                  },
                );
                res.json().then((result) => callback(result));
              } catch {
                return callback([]);
              }
            }, 750)}
          />

          {places.length < 2 ? <NotEnoughPlaces /> : <RouteList />}
        </div>
      )}
    </section>
  );
};

export default SidebarTripper;
