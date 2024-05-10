"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { Fragment } from "react";
import NavigationItem from "./NavigationItem";
import SecondaryNavigationItem from "./SecondaryNavigationItem";
import { cn } from "@/lib/utils";

export default function DesktopNavigation({
  primaryNavItems,
  secondaryNavItems,
}: {
  primaryNavItems: any;
  secondaryNavItems: any;
}) {
  return (
    <>
      {secondaryNavItems && (
        <Popover.Group className="hidden md:flex absolute top-0 right-10 flex-wrap justify-end antialiased">
          {secondaryNavItems.length > 0 &&
            secondaryNavItems.map((item: any) => (
              <SecondaryNavigationItem key={item.id} item={item} />
            ))}
        </Popover.Group>
      )}
      <Popover.Group
        className={cn(
          secondaryNavItems ? "self-end mb-2" : "",
          "hidden md:flex flex-wrap justify-end md:gap-x-12 md:gap-y-2 antialiased"
        )}
      >
        {primaryNavItems.length > 0 &&
          primaryNavItems.map((item: any) => (
            <NavigationItem key={item.id} item={item} />
          ))}
      </Popover.Group>
    </>
  );
}
