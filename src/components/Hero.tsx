"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Image from "next/image";
import React from "react";

export default function Hero({ slides }: any) {
  console.log(slides);
  return (
    <Splide
      className="relative h-full flex"
      options={{
        type: "fade",
        rewind: true,
        pagination: false,
        arrows: false,
        autoplay: false,
        interval: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
      }}
    >
      {slides.map((slide: any, index: any) => (
        <SplideSlide key={index} className={"h-full object-cover bg-black"}>
          <div className="absolute flex items-end flex-col right-16 bottom-52 text-white z-20 uppercase antialiased">
            <h1 className="font-bold text-6xl text-right">
              {slide.primaryText}
            </h1>
            <h2 className="text-2xl font-light text-right">
              {slide.secondaryText}
            </h2>
          </div>

          <div className="absolute z-10 h-screen w-screen bg-gradient-to-b from-black to-transparent"></div>
          <div className="bg-black opacity-90 h-full">
            <Image
              className="relative h-full bg-cover"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.image.url}`}
              alt={slide.image.alt}
              width={slide.image.width}
              height={slide.image.height}
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
