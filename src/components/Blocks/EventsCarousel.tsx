"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { format } from "date-fns";

export default function EventsCarousel({ events }: any) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="gap-4">
        {events.map((event: any) => {
          return (
            <CarouselItem
              key={event.id}
              className="bg-[#4EBCC1] basis-[49%] md:basis-[33%] group h-36 p-2 justify-between flex flex-col"
            >
              <h3 className="text-white font-bold text-3xl uppercase">
                {event.title}
              </h3>
              <p className="uppercase flex gap-1 text-4xl font-bold self-end text-white">
                {format(new Date(event.start.date), "d")}
                <span className="text-[#31787B]">
                  {format(new Date(event.start.date), "MMM")}
                </span>
              </p>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
