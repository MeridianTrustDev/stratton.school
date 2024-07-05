"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { format } from "date-fns";
import { Newspaper } from "lucide-react";

export default function NewsCarousel({ news }: any) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full h-36 overflow-hidden"
    >
      <CarouselContent className="gap-4">
        {news.map((news: any) => {
          return (
            <CarouselItem
              key={news.id}
              className="bg-[#D9B21D] basis-full md:basis-[49%] group overflow-hidden p-2"
            >
              <Link
                href={`/news/${news.slug}`}
                className="w-full flex items-center gap-2 h-full"
              >
                {news.featuredImage && (
                  <Image
                    src={news.featuredImage.url}
                    alt={news.featuredImage.alt}
                    width={200}
                    height={200}
                    className="w-1/3 object-cover self-start"
                  />
                )}
                <div className="flex-col flex justify-between w-full h-full break-words overflow-hidden">
                  <h3 className="text-white font-medium tracking-wide text-xl line-clamp-3 break-words w-full text-left">
                    {news.title}
                  </h3>
                  <div className="flex justify-between w-full items-center">
                    <p className="uppercase flex gap-1 text-4xl font-bold text-white">
                      {format(new Date(news.createdAt), "d")}
                      <span className="text-[#86732A]">
                        {format(new Date(news.createdAt), "MMM")}
                      </span>
                    </p>
                    <Newspaper
                      className="text-[#86732A] group-hover:text-white transition-all ease-in-out"
                      size={32}
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
