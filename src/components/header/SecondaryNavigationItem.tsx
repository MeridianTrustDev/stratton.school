import { cn, navItemUrl } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NavigationChildItem from "./NavigationChildItem";
import { icons } from "lucide-react";

export default function SecondaryNavigationItem({ item }: { item: any }) {
  const [isShowing, setIsShowing] = React.useState(false);

  const hasChildren = item.children.length > 0;

  item.url = navItemUrl(item);

  const Icon = icons[item.icon as keyof typeof icons];

  return (
    <div
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
    >
      {hasChildren ? (
        <Popover open={isShowing}>
          <PopoverTrigger asChild>
            <Link
              prefetch={false}
              style={{ backgroundColor: item.color }}
              className={cn(
                isShowing ? "transition-all" : "text-white",
                "flex items-center gap-x-1 text-lg font-bold uppercase leading-6 transition-all focus:outline-none"
              )}
              href={item.disableLink ? "#" : item.url ? item.url : "#"}
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
                    prefetch={false}
                    key={child.id}
                    href={child.url || "#"}
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
          prefetch={false}
          href={item.url || "#"}
          style={{ backgroundColor: item.color }}
          className="flex h-10 min-w-10 items-center justify-center px-2 py-2 cursor-pointer gap-2 text-sm font-semibold uppercase leading-6 text-white border-b-2 border-transparent transition-all group"
        >
          {Icon && <Icon className="w-5 h-5" />}
          {item.showLabel && item.label}
        </Link>
      )}
    </div>
  );
}
