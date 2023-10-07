"use client";

import React from "react";

import { useAppDispatch } from "@/redux/store";
import { setCity, setPlaces } from "@/redux/slice/fetcherSlice";

import AsyncSelect from "react-select/async";
import { SelectWrapperProps } from "@/utils/interfaces";

const SelectWrapper: React.FC<SelectWrapperProps> = ({
  label,
  fetchType,
  getOptionValue,
  getOptionLabel,
  loadOptions,
  value,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex-col flex justify-center items-start w-full gap-2">
      {label && <span>{label}</span>}
      <AsyncSelect
        value={value}
        placeholder={`Choose a ${fetchType}...`}
        className="w-full"
        instanceId={`${label}Select`}
        getOptionLabel={(item) => getOptionLabel(item) ?? "Choose..."}
        getOptionValue={(item) => getOptionValue(item)}
        isMulti={fetchType !== "city"}
        cacheOptions={true}
        loadOptions={(e, callback) => {
          loadOptions(e, callback);
        }}
        isDisabled={
          fetchType === "place" && Array.isArray(value) && value?.length > 10
        }
        onChange={(selected) => {
          if (fetchType === "city") {
            dispatch(setCity(selected));
            dispatch(setPlaces([]));
          } else {
            dispatch(setPlaces(selected));
          }
        }}
        styles={{
          multiValueRemove: () => ({
            display: "none",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            paddingRight: "6px",
          }),
          container: (provided) => ({
            ...provided,
            minWidth: "185px",
          }),
        }}
      />
    </div>
  );
};

export default SelectWrapper;
