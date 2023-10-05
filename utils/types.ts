import { GeonameProps, TripmapProps } from "@/utils/interfaces";

export type SelectOptionCustomType = GeonameProps | TripmapProps;

export type QueryOption = { [key: string]: string | number | undefined | null };
