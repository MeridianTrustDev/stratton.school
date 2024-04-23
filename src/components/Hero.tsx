"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Image from "next/image";
import React from "react";

export default function Hero({ slides }: any) {
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
        <SplideSlide key={index} className={"h-full bg-black"}>
          <div className="absolute h-full justify-center w-full flex items-center md:items-end md:justify-end flex-col md:right-16 md:bottom-52 text-white z-20 uppercase antialiased">
            <div className="w-96 md:w-[70vw]">
              <h1 className="font-bold text-3xl md:text-6xl text-center md:text-right">
                {slide.primaryText}
              </h1>
              <h2 className="text-lg md:text-2xl font-light text-center md:text-right">
                {slide.secondaryText}
              </h2>
            </div>
          </div>

          <div className="absolute z-10 h-screen w-screen bg-gradient-to-b from-black to-transparent"></div>
          <div className="bg-black opacity-90 h-full">
            <Image
              className="relative h-full bg-cover object-cover"
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
