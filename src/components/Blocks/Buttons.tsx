import { blocks } from "@/blocks/blockList";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Buttons({ buttons }: any) {
  return (
    <div className="flex w-full items-center justify-center  p-4">
      <div className="flex flex-col w-full sm:flex-row max-w-7xl gap-4">
        {buttons.map((button: any, index: any) => {
          console.log(button);
          return (
            <Link
              key={button.id}
              href={
                button.target === "reference"
                  ? `/${button.reference.slug}`
                  : button.url
              }
              className="text-white group uppercase w-full h-32 hover:scale-[102%] transition-all ease-in-out font-bold text-lg relative bg-black"
            >
              <span className="absolute z-10 bottom-0 left-0 text-2xl md:text-3xl transition-all p-2 w-3/4">
                {button.text}
              </span>
              <div
                style={{
                  background: `linear-gradient(to right, ${button.backgroundColour} 20%, rgba(0, 0, 0, 0) 100%`,
                }}
                className="z-[5] w-full h-full absolute"
              />
              <Image
                loading="lazy"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${button.backgroundImage.url}`}
                width={button.backgroundImage.width}
                height={button.backgroundImage.height}
                alt={button.backgroundImage.alt}
                className="h-full w-full object-cover"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
