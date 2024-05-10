"use client";

import { cn, navItemUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar({ parent, className }: any) {
  const pathname = usePathname();

  return (
    <div className={cn(className, "w-full h-fit bg-[#F3F3F3] px-4 py-2")}>
      <div>
        <h3 className="font-bold uppercase text-[#4C4C4C] text-2xl">
          {parent.label}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-1">
        {parent.children.map((child: any) => {
          const url = navItemUrl(child);
          return (
            <Link
              href={url}
              key={child.id}
              className={cn(
                url === pathname
                  ? "bg-[#4EBCC1] text-[#fff]"
                  : "text-[#4C4C4C] hover:bg-[#e9e9e9]",
                "uppercase font-bold px-2 py-1"
              )}
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
