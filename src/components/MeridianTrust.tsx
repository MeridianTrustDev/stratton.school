import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";

export default function MeridianTrust() {
  return (
    <div className="w-full flex justify-center py-4 bg-white ">
      <div className="flex flex-col w-full max-w-7xl p-4 h-50 items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col gap-1 w-fit">
              <h2 className="uppercase font-bold text-3xl text-gray-700">
                About Meridian Trust
              </h2>
              <Separator className="h-[5px] bg-[#004e73]" />
              <Link
                href="https://meridiantrust.co.uk"
                className="text-[#004e73] font-bold text-sm uppercase flex gap-2 items-center group"
              >
                Find out more
                <ArrowRight className="text-[#004e73] group-hover:translate-x-1 transition-all ease-in-out" />
              </Link>
            </div>
            <Icons.MeridianTrust className="w-1/2 md:w-56" />
          </div>
          <p className="font-light text-lg">
            Meridian Trust is a successful multi-academy trust founded on its
            commitment to people and communities. Every child is known, equally
            valued and supported to achieve their potential in all our
            academies.
            <br />
            Every community we serve benefits from the facilities and services
            we provide. Our staff benefit from strong networks, excellent career
            opportunities and a human approach where they are equally valued and
            supported.
            <br />
            We ensure that well-run schools retain and develop their distinct
            contextual identity, while sharing and contributing to our common
            values, practices, curriculum approaches and operational systems.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {values.map((value: any) => {
            return (
              <div
                key={value.name}
                className="flex w-full group px-4 py-2 bg-slate-50 flex-row justify-between items-center fill-slate-600 text-slate-600"
              >
                <div className="w-1/3 group-hover:-translate-y-2 transition-all ease-in-out">
                  <value.icon />
                </div>
                <div className="w-2/3">
                  <h3 className="font-bold text-base uppercase">
                    {value.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    name: "Achievement for all",
    icon: Icons.AchievementForAll,
  },
  {
    name: "Valuing People",
    icon: Icons.ValuingPeople,
  },
  {
    name: "High Quality Learning Environment",
    icon: Icons.HQLE,
  },
  {
    name: "Pursuit of Excellence",
    icon: Icons.PursuitOfExcellence,
  },
  {
    name: "Extending the boundaries of learning",
    icon: Icons.EBOL,
  },
];
