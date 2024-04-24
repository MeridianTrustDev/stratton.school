import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function navItemUrl(item: any) {
  if (item.type === "parent") {
    return "#";
  } else if (item.type === "reference") {
    if (item.reference.slug === undefined) {
      return "/";
    }
    return `/${item.reference.slug}`;
  } else if (item.type === "custom") {
    return item.url;
  } else {
    return "#";
  }
}
