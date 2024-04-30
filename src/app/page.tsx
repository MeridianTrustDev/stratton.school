import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { ChevronsDown, Mouse } from "lucide-react";
import { Metadata } from "next";
import MeridianTrust from "@/components/MeridianTrust";
import { Icons } from "@/components/Icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=5`
  );

  const page = (await response.json()).docs[0];

  return (
    <>
      <div className="h-[50vh] md:h-[99vh] w-[100vw] relative">
        <Link
          href="https://meridiantrust.co.uk"
          target="_blank"
          className="flex flex-col gap-1 tracking-wide text-center text-sm absolute m-4 bottom-0 left-0 bg-white rounded-xl z-10 px-4 py-2 items-center justify-center"
        >
          <span>Proud to be part of</span>
          <Icons.MeridianTrust className="w-48" />
        </Link>
        <Hero slides={page.hero.slides} />
      </div>
      <div className="flex w-full items-end justify-center bg-white">
        <Separator className="h-[10px] bg-[#D9B21D]" />
      </div>
      <div className="w-full bg-white">
        <RenderBlocks layout={page.layout} />
      </div>
      <MeridianTrust />
    </>
  );
}
