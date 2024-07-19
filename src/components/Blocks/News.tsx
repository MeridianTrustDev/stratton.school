import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { getNews } from "@/lib/payload/news";
import NewsCarousel from "./NewsCarousel";

export default async function News() {
  const news = await getNews();

  return (
    <div className="w-full flex flex-col antialiased px-4 pt-2 md:pt-4 gap-2">
      <div className="flex items-center gap-4 justify-between">
        <h2 className="text-[#4C4C4C] uppercase font-extrabold text-3xl">
          Latest News
        </h2>
        <Link
          prefetch={false}
          href="/news"
          className="flex uppercase text-[#D9B21D] font-bold group"
        >
          More
          <ArrowRight className="group-hover:translate-x-1 transition-all ease-in-out" />
        </Link>
      </div>
      <NewsCarousel news={news} />
    </div>
  );
}
