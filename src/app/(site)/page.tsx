import React from "react";
import qs from "qs";
import Hero from "@/components/Hero";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { Metadata } from "next";
import MeridianTrust from "@/components/MeridianTrust";
import Link from "next/link";
import { getHouses } from "@/lib/payload/houses";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Home | Stratton School",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
};

export default async function Home() {
  const query = {
    type: {
      equals: "home",
    },
    "tenant.name": {
      equals: "Stratton School",
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=6`
  );

  const page = (await response.json()).docs[0];

  if (!page) notFound();

  const houses = await getHouses();

  return (
    <>
      <div className="h-[50vh] md:h-[75vh] w-[100vw] relative bg-black">
        <Hero slides={page.hero.slides} />
        <div className="absolute bottom-0 flex w-full justify-center bg-white">
          {page.hero.showHousePoints && (
            <div className="relative w-full flex items-center left-0 text-white z-10 bottom-0">
              {houses
                .sort((a: any, b: any) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })
                .map((house: any) => (
                  <Link
                    key={house.id}
                    className="flex flex-col md:flex-row justify-end overflow-hidden md:overflow-visible items-center h-14 group md:gap-6 basis-[100%] md:h-14 md:py-4 md:px-8 max-w-[25%] relative"
                    style={{ backgroundColor: `${house.houseColour}` }}
                    href={`/our-house-system`}
                  >
                    {house.logo && (
                      <Image
                        src={house.logo.url}
                        width={house.logo.width}
                        height={house.logo.height}
                        alt={house.logo.alt}
                        className="hidden md:block opacity-30 md:opacity-100 md:-translate-y-10 object-contain max-w-[100px] group-hover:-translate-y-12  ease-in-out transition-all absolute left-0 translate-x-2"
                      />
                    )}
                    <h4 className="text-sm md:hidden lg:block md:text-3xl uppercase font-bold md:opacity-20">
                      {house.name}
                    </h4>
                    <span className="text-white font-bold text-2xl md:text-3xl text-right">
                      {house.points}
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <RenderBlocks layout={page.layout} />
      </div>
      <MeridianTrust />
    </>
  );
}
