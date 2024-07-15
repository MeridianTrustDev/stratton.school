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
        autoplay: true,
        interval: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
      }}
    >
      {slides.map((slide: any, index: any) => (
        <SplideSlide key={index} className={"h-full bg-black"}>
          <div className="absolute h-full justify-center w-full flex items-center md:items-end md:pr-10 flex-col text-white z-20 uppercase antialiased">
            <div className="w-96 md:w-[60vw]">
              <h1 className="font-bold text-3xl md:text-6xl text-center md:text-right">
                {slide.primaryText}
              </h1>
              <h2 className="text-lg md:text-2xl font-light text-center md:text-right">
                {slide.secondaryText}
              </h2>
            </div>
          </div>

          <div className="absolute z-10 h-screen w-screen bg-gradient-to-b from-black to-transparent opacity-50"></div>
          <div className="bg-black opacity-90 h-full">
            {slide.image && (
              <img
                className="relative h-full bg-cover object-cover"
                src={slide.image.url}
                alt={slide.image.alt}
                width={slide.image.width}
                height={slide.image.height}
              />
            )}
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
