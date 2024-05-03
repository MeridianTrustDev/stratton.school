import { cn, navItemUrl } from "@/lib/utils";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { Fragment, useRef } from "react";

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
            <Popover.Panel className="absolute -right-8 top-full z-10 w-56 rounded-xl bg-white p-2 shadow-lg">
              {item.children.length > 0 &&
                item.children.map((child: any) => {
                  child.url = navItemUrl(child);

                  if (child.children.length > 0) {
                    return (
                      <Disclosure as="div" key={child.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between items-center rounded-lg text-left px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 w-full">
                              {child.label}
                              <ChevronDown
                                className={cn(
                                  open ? "rotate-180" : "",
                                  "h-5 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>

                            <Disclosure.Panel>
                              {child.children &&
                                child.children.length > 0 &&
                                child.children.map((childChild: any) => {
                                  childChild.url = navItemUrl(childChild);

                                  return (
                                    <Link
                                      key={childChild.id}
                                      onClick={() => setIsShowing(false)}
                                      href={childChild.url}
                                      className="block rounded-lg pl-8 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    >
                                      {childChild.label}
                                    </Link>
                                  );
                                })}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    );
                  }

                  return (
                    <Link
                      key={child.id}
                      href={child.url}
                      onClick={() => setIsShowing(false)}
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
          className="flex items-center cursor-pointer gap-x-1 text-md font-bold uppercase leading-6 text-white border-b-2 border-transparent hover:text-[#D9B21D] transition-all hover:border-b-2 hover:border-[#D9B21D]"
        >
          {item.label}
        </Link>
      )}
    </>
  );
}
