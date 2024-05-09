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
    >
      <CarouselContent>
        {news.map((news: any) => {
          return (
            <CarouselItem
              key={news.id}
              className="bg-[#D9B21D] w-auto group h-36 p-2"
            >
              <Link
                href={`/news/${news.slug}`}
                className="h-full flex items-center gap-2"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${news.featuredImage.url}`}
                  alt={news.featuredImage.alt}
                  width={200}
                  height={200}
                  className="h-full object-cover self-start"
                />
                <div className="flex-col flex justify-between h-full">
                  <h3 className="text-white text-center font-medium tracking-wide text-xl line-clamp-3">
                    {news.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="uppercase flex gap-1 text-4xl font-bold self-end text-white">
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
