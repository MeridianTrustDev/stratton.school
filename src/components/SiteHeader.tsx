"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SiteHeader({ header }: { header: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryNavItems = header.primaryNavigation.navItems;

  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (header) {
          if (window.scrollY > 0) {
            header.classList.add("bg-black");
          } else {
            header.classList.remove("bg-black");
          }
        }
      });
    }

    return () => {
      window.removeEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (header) {
          if (window.scrollY > 0) {
            header.classList.add("bg-black");
          } else {
            header.classList.remove("bg-black");
          }
        }
      });
    };
  }, [path]);

  return (
    <header
      className={cn(
        path !== "/" ? "bg-black" : "fixed",
        "z-20 w-full transition-all ease-in-out"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Stratton School</span>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${header.logo.url}`}
              width={header.logo.width}
              height={header.logo.height}
              alt={header.logo.alt}
              className="resize-none max-w-60"
            />
          </Link>
        </div>
        <div className="flex w-full justify-end md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {!mobileMenuOpen ? (
              <>
                <span className="sr-only">Open main menu</span>
                <Menu className="h-10 w-10" aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="sr-only">Close main menu</span>
                <X className="h-10 w-10" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <DesktopNavigation primaryNavItems={primaryNavItems} />
      </nav>
      <MobileNavigation
        header={header}
        primaryNavItems={primaryNavItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
}
