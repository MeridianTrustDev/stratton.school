import { blocks } from "@/blocks/blockList";
import { payload } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import EventsCarousel from "./EventsCarousel";

export default async function Events() {
  let events = null;
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      "start.date": {
        greater_than: new Date(),
      },
      // This query could be much more complex
      // and QS would handle it beautifully
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await payload.get(
      `/api/events${stringifiedQuery}&depth=2`
    );

    events = response.data.docs;
  } catch (error) {
    console.log(error);
    return;
  }

  return (
    <div className="w-full justify-center flex flex-col md:flex-row p-4 md:h-full items-center gap-4 md:gap-8">
      <div className="w-full md:h-44 md:w-44 flex justify-between md:flex-col gap-2 md:justify-center">
        <h2 className="uppercase font-bold text-3xl text-gray-700">
          Upcoming Events
        </h2>
        <Separator className="hidden md:block h-[5px] bg-[#4EBCC1]" />
        <Link
          href="/events"
          className="text-[#4EBCC1] font-bold text-sm uppercase flex gap-2 items-center group"
        >
          View Calendar
          <ArrowRight className="text-[#4EBCC1] group-hover:translate-x-1 transition-all ease-in-out" />
        </Link>
      </div>
      <div className="flex w-1/2 md:w-full">
        <EventsCarousel events={events} />
      </div>
    </div>
  );
}
