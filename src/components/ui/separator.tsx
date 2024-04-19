"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsDown, Mouse } from "lucide-react";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div className="flex items-end justify-center">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "w-full" : "h-full",
          className
        )}
        {...props}
      />
      <div className="absolute flex flex-col items-center p-4 w-10 h-20 bg-[#4EBCC1]">
        <Mouse size={30} className="text-white" />
        <ChevronsDown size={25} className="text-white" />
      </div>
    </div>
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
