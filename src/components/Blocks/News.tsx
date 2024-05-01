import { blocks } from "@/blocks/blockList";
import { payload } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowRight, Newspaper } from "lucide-react";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getNews } from "@/lib/payload/news";

export default async function News() {
  const news = await getNews();

  return (
    <div className="w-full bg-white flex justify-center">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-7xl p-4 h-50 gap-4 md:gap-8">
        <div className="flex w-full justify-center">
          <Carousel className="flex">
            <CarouselContent className="flex w-full gap-4">
              {news.map((news: any) => {
                return (
                  <CarouselItem
                    key={news.id}
                    className="bg-[#D9B21D] basis-5/6 md:basis-1/2 group lg:basis-1/3 h-72 p-2 "
                  >
                    <Link
                      href={`/news/${news.slug}`}
                      className="w-full h-full flex flex-col items-center justify-between "
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${news.featuredImage.url}`}
                        alt={news.featuredImage.alt}
                        width={200}
                        height={200}
                        className="w-full h-1/2 object-cover self-start"
                      />
                      <h3 className="text-white text-center font-medium tracking-wide text-xl line-clamp-2 w-full">
                        {news.title}
                      </h3>
                      <div className="flex justify-between w-full items-center">
                        <Newspaper
                          className="text-[#86732A] group-hover:text-white transition-all ease-in-out"
                          size={32}
                        />
                        <p className="uppercase flex gap-1 text-4xl font-bold self-end text-white">
                          {format(new Date(news.createdAt), "d")}
                          <span className="text-[#86732A]">
                            {format(new Date(news.createdAt), "MMM")}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="w-fit md:w-52 flex flex-col justify-center gap-2">
          <h2 className="uppercase font-bold text-3xl text-gray-700">
            Latest News
          </h2>
          <Separator className="h-[5px] bg-[#D9B21D]" />
          <Link
            href="/news"
            className="text-[#D9B21D] font-bold text-sm uppercase flex gap-2 items-center group"
          >
            View News
            <ArrowRight className="text-[#D9B21D] group-hover:translate-x-1 transition-all ease-in-out" />
          </Link>
        </div>
      </div>
    </div>
  );
}
