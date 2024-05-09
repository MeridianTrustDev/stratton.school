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
    <div className="w-full flex flex-1 flex-col antialiased px-4 pt-2 md:pt-4 gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-[#4C4C4C] uppercase font-extrabold text-3xl">
          Upcoming Events
        </h2>
        <Link
          href="/events"
          className="flex uppercase text-[#4EBCC1] font-bold group"
        >
          More
          <ArrowRight className="text-[#4EBCC1] group-hover:translate-x-1 transition-all ease-in-out" />
        </Link>
      </div>
      <EventsCarousel events={events} />
    </div>
  );
}
