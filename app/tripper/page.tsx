"use client";

import SidebarTripper from "@/components/SidebarTripper";
import MapGoogle from "@/components/MapComponents/MapGoogle";

export default function Home() {
  return (
    <>
      <SidebarTripper />
      <main className="w-full h-full">
        <MapGoogle />
      </main>
    </>
  );
}
