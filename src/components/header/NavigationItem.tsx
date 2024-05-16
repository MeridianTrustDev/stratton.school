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
import NavigationChildItem from "./NavigationChildItem";

export default function NavigationItem({ item }: { item: any }) {
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
          <PopoverTrigger asChild>
            <Link
              className={cn(
                isShowing
                  ? "text-[#D9B21D] transition-all border-b-2 border-[#D9B21D]"
                  : "text-white",
                "flex items-center gap-x-1 text-lg font-bold uppercase leading-6 transition-all focus:outline-none"
              )}
              href={item.url}
            >
              {item.label}
              <ChevronDown className="h-5 w-5 flex-none " aria-hidden="true" />
            </Link>
          </PopoverTrigger>

          <PopoverContent className="-mt-2">
            {item.children.length > 0 &&
              item.children.map((child: any) => {
                child.url = navItemUrl(child);

                if (child.children.length > 0) {
                  return <NavigationChildItem key={child.id} item={child} />;
                }

                return (
                  <Link
                    key={child.id}
                    href={child.url}
                    onClick={() => setIsShowing(false)}
                    className="block rounded-lg px-3 py-2 text-md font-semibold leading-6 text-gray-900 hover:bg-gray-50 focus:outline-none"
                  >
                    {child.label}
                  </Link>
                );
              })}
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href={item.url}
          className="flex items-center cursor-pointer gap-x-1 text-lg font-bold uppercase leading-6 text-white border-b-2 border-transparent hover:text-[#D9B21D] transition-all hover:border-b-2 hover:border-[#D9B21D]"
        >
          {item.label}
        </Link>
      )}
    </div>
  );
}
