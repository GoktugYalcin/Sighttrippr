import { NextResponse } from "next/server";
import { Geonames } from "@/fetchers/generated/Geonames";
import { Tripmap } from "@/fetchers/generated/Tripmap";
/*
https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist_attraction+name+includes+kasr%C4%B1&key=AIzaSyDrwmXyDHTbPZYzC_lR_V4FRY9H2OOaRKo&type=point_of_interest&location=41.01384,28.94966
https://developers.google.com/maps/documentation/places/web-service/search-text?hl=tr
*/
export async function POST(
  request: Request,
  { params }: { params: { fetchType: string } },
) {
  const { searchParams } = new URL(request.url);
  const fetcher =
    params.fetchType === "city"
      ? new Geonames(searchParams.get("q"))
      : new Tripmap(
          searchParams.get("lat"),
          searchParams.get("lon"),
          searchParams.get("q"),
        );

  try {
    const res = await fetch(fetcher.getFullURL());
    const result = await res.json();

    return NextResponse.json(
      params.fetchType === "city" ? result?.geonames : result,
    );
  } catch (e) {
    return NextResponse.json({});
  }
}
