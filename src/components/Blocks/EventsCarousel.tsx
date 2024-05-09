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
      className="flex w-full"
    >
      <CarouselContent className="flex w-full gap-4">
        {events.map((event: any) => {
          return (
            <CarouselItem
              key={event.id}
              className="bg-[#4EBCC1] w-52 h-36 p-4 flex flex-col justify-between"
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
