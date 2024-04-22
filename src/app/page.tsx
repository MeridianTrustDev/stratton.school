import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { ChevronsDown, Mouse } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  let page = null;
  try {
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

    page = (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }

  return (
    <>
      <div className="h-[99vh] w-[100vw] relative">
        <Hero slides={page.hero.slides} />
      </div>
      <div className="flex items-end justify-center">
        <Separator className="h-[10px] bg-[#D9B21D]" />
        <div className="absolute flex flex-col items-center p-4 w-10 h-20 bg-[#4EBCC1]">
          <Mouse size={30} className="text-white" />
          <ChevronsDown size={25} className="text-white" />
        </div>
      </div>
      <RenderBlocks layout={page.layout} />
    </>
  );
}
