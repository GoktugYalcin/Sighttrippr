import { NextResponse } from "next/server";
import { Geonames } from "@/fetchers/generated/Geonames";
import { Tripmap } from "@/fetchers/generated/Tripmap";
import { Places } from "@/fetchers/generated/Places";
export async function POST(
  request: Request,
  { params }: { params: { fetchType: string } },
) {
  const { searchParams } = new URL(request.url);
  const fetcher =
    params.fetchType === "city"
      ? new Geonames(searchParams.get("q"))
      : new Places(searchParams.get("q")!, {
          lat: searchParams.get("lat")!,
          lng: searchParams.get("lng")!,
        });

  try {
    const res = await fetch(fetcher.getFullURL());
    const result = await res.json();

    return NextResponse.json(result?.geonames || result.results);
  } catch (e) {
    return NextResponse.json({});
  }
}
