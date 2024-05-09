import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { getNews } from "@/lib/payload/news";
import NewsCarousel from "./NewsCarousel";

export default async function News() {
  const news = await getNews();

  return (
    <div className="w-full justify-center flex flex-col md:flex-row p-4 md:h-44 items-center gap-4 md:gap-8">
      <div className="w-full md:h-44 md:w-44 flex justify-between md:flex-col gap-2 md:justify-center">
        <h2 className="uppercase font-bold text-3xl text-gray-700">
          Latest News
        </h2>
        <Separator className="hidden md:block h-[5px] bg-[#D9B21D]" />
        <Link
          href="/news"
          className="text-[#D9B21D] font-bold text-sm uppercase flex gap-2 items-center group"
        >
          View News
          <ArrowRight className="text-[#D9B21D] group-hover:translate-x-1 transition-all ease-in-out" />
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <NewsCarousel news={news} />
      </div>
    </div>
  );
}
