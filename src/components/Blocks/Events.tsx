import { blocks } from "@/blocks/blockList";
import { payload } from "@/lib/payload";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import React from "react";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default async function Events() {
  let events = null;
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
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
      `/api/events${stringifiedQuery}&depth=0`
    );

    events = response.data.docs;
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(events);

  return (
    <div className="w-full bg-[#F3F3F3] flex justify-center">
      <div className="flex w-full max-w-7xl p-4 h-50 items-center gap-4">
        <div className="w-52 flex flex-col gap-2">
          <h2 className="uppercase font-bold text-3xl text-gray-700">
            Upcoming Events
          </h2>
          <Separator className="h-[5px] bg-[#4EBCC1]" />
          <Link
            href="/events"
            className="text-[#4EBCC1] font-bold text-sm uppercase flex gap-2 items-center group"
          >
            View Calendar
            <ArrowRight className="text-[#4EBCC1] group-hover:translate-x-1 transition-all ease-in-out" />
          </Link>
        </div>
        <div className="flex w-full">
          {events.map((event: any) => {
            return (
              <div
                key={event.id}
                className="bg-[#4EBCC1] w-52 h-44 p-4 flex flex-col justify-between"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
