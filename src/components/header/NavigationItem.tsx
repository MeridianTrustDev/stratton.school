import { cn, navItemUrl } from "@/lib/utils";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";

export default function NavigationItem({ item }: { item: any }) {
  const [isShowing, setIsShowing] = React.useState(false);

  const hasChildren = item.children.length > 0;

  item.url = navItemUrl(item);

  return (
    <>
      {hasChildren ? (
        <Popover
          onMouseEnter={() => setIsShowing(true)}
          onMouseLeave={() => setIsShowing(false)}
          className="relative"
        >
          <Popover.Button
            className={cn(
              isShowing
                ? "text-[#D9B21D] transition-all border-b-2 border-[#D9B21D]"
                : "text-white",
              "flex items-center gap-x-1 text-md font-bold uppercase leading-6 transition-all"
            )}
          >
            {item.label}
            <ChevronDown className="h-5 w-5 flex-none " aria-hidden="true" />
          </Popover.Button>

          <Transition
            show={isShowing}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -right-8 top-full z-10 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
              {item.children.length > 0 &&
                item.children.map((child: any) => {
                  child.url = navItemUrl(child);
                  return (
                    <Link
                      key={child.id}
                      href={child.url}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      {child.label}
                    </Link>
                  );
                })}
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : (
        <Link
          href={item.url}
          className="flex items-center cursor-pointer gap-x-1 text-md font-bold uppercase leading-6 text-white hover:text-[#D9B21D] transition-all hover:border-b-2 border-[#D9B21D]"
        >
          {item.label}
        </Link>
      )}
    </>
  );
}
