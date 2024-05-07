import { navItemUrl } from "@/lib/utils";
import Link from "next/link";
import qs from "qs";
import React from "react";

export default async function Sidebar({ parent }: any) {
  return (
    <div className="w-full h-fit bg-[#F3F3F3] px-4 py-2">
      <div>
        <h3 className="font-bold uppercase text-[#4C4C4C] text-2xl">
          {parent.label}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2">
        {parent.children.map((child: any) => {
          console.log(child);
          const url = navItemUrl(child);
          return (
            <Link
              href={url}
              key={child.id}
              className="uppercase font-bold text-[#4C4C4C]"
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
