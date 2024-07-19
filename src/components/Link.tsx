import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import type { Page } from "@/types/payload";
import { cn } from "@/lib/utils";

type CMSLinkType = {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  newTab?: boolean;
  reference?: {
    relationTo: "pages" | "posts";
    value: Page | string;
  };
  size?: ButtonProps["size"];
  type?: "custom" | "reference";
  url?: string;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { type, children, className, label, newTab, reference, url } = props;

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `${
          reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""
        }/${reference.value.slug}`
      : url;

  if (!href) return null;

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link
      prefetch={false}
      className={cn(className, "underline")}
      href={href || url || "#"}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Link>
  );
};
