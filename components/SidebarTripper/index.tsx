"use client";

import React from "react";
import SelectWrapper from "@/components/SelectWrapper";
import { getCountryFlagEmoji } from "@/utils";
import { HiChevronUpDown } from "react-icons/hi2";
import { useAppSelector } from "@/redux/store";
import { Tripmap } from "@/fetchers/generated/Tripmap";
import debounce from "lodash.debounce";
import { GetOptionLabel, GetOptionValue } from "react-select";
import { GeonameProps, TripmapProps } from "@/utils/interfaces";

const SidebarTripper = () => {
  const { city, places } = useAppSelector((state) => state.fetcher);

  return (
    <section className="flex flex-col absolute left-0 z-10 w-1/3 min-w-[400px] bg-[#F2F4F7] shadow-lg gap-[20px] m-2.5 items-center rounded-xl">
      <div
        aria-label="header of sidebar"
        className="flex w-full p-4 bg-white justify-between items-center gap-12 rounded-xl"
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
            label={"City"}
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
          {!!city?.name && (
            <SelectWrapper
              label={"Place"}
              fetchType={"place"}
              value={places}
              getOptionLabel={(item) => item.name}
              getOptionValue={(
                option: GetOptionValue<TripmapProps | GeonameProps>,
              ) => (option as unknown as TripmapProps).xid! ?? null}
              loadOptions={debounce(async (e, callback) => {
                const placeObj = new Tripmap(city.lat!, city.lng!, e);
                await placeObj.fetchQuery(callback);
              }, 750)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SidebarTripper;
