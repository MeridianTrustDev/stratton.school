import { cn, navItemUrl } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Fragment, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NavigationChildItem({ item }: { item: any }) {
  const [isShowing, setIsShowing] = React.useState(false);

  const hasChildren = item.children.length > 0;

  item.url = navItemUrl(item);

  return (
    <div
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
    >
      {hasChildren ? (
        <Popover open={isShowing}>
          <PopoverTrigger className="text-left flex w-full justify-between group items-center   focus:outline-none">
            <Link
              className="hover:bg-gray-50 w-full h-full rounded-lg px-3 py-2 text-md font-semibold leading-6 text-gray-900"
              href={item.url || "#"}
            >
              {item.label}
            </Link>
            <div className="border-l px-4">
              <ChevronDown
                className={cn(
                  isShowing && "-rotate-90",
                  "h-5 w-5 flex-none group-hover:-rotate-90 transition-all ease-in-out"
                )}
                aria-hidden="true"
              />
            </div>
          </PopoverTrigger>

          <PopoverContent side="right">
            {item.children.length > 0 &&
              item.children.map((child: any) => {
                child.url = navItemUrl(child);

                return (
                  <Link
                    key={child.id}
                    href={child.url || "#"}
                    onClick={() => setIsShowing(false)}
                    className="block rounded-lg px-3 py-2 text-md font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {child.label}
                  </Link>
                );
              })}
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href={item.url || "#"}
          className="flex items-center cursor-pointer gap-x-1 text-lg font-bold uppercase leading-6 text-white border-b-2 border-transparent hover:text-[#D9B21D] transition-all hover:border-b-2 hover:border-[#D9B21D]"
        >
          {item.label}
        </Link>
      )}
    </div>
  );
}
