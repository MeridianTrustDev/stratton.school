"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { Fragment } from "react";
import NavigationItem from "./NavigationItem";

export default function DesktopNavigation({
  primaryNavItems,
}: {
  primaryNavItems: any;
}) {
  return (
    <Popover.Group className="hidden md:flex flex-wrap justify-end md:gap-x-12 md:gap-y-2">
      {primaryNavItems.length > 0 &&
        primaryNavItems.map((item: any) => (
          <NavigationItem key={item.id} item={item} />
        ))}
    </Popover.Group>
  );
}
