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
  const [scrollY, setScrollY] = useState(0);

  const primaryNavItems = header.primaryNavigation.navItems;
  const secondaryNavItems = header.secondaryNavigation
    ? header.secondaryNavigation.navItems
    : [];

  const path = usePathname();

  useEffect(() => {
    // Function to persist scroll position on page refresh
    const handleScrollPersist = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener to persist scroll position
    window.addEventListener("scroll", handleScrollPersist);

    // Set scroll position on component mount
    setScrollY(window.scrollY);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScrollPersist);
    };
  }, []); // Run effect only once on component mount

  return (
    <header
      className={cn(
        path !== "/" &&
          !mobileMenuOpen &&
          "bg-black border-[#D9B21D] border-b-[10px]",
        (scrollY > 0 || mobileMenuOpen) && "bg-black",
        "z-20 w-screen fixed"
      )}
    >
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link prefetch={false} href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Stratton School</span>
            {header.logo && (
              <img
                src={header.logo.url}
                width={header.logo.width}
                height={header.logo.height}
                alt={header.logo.alt}
                className="resize-none max-w-60"
              />
            )}
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
        <DesktopNavigation
          primaryNavItems={primaryNavItems}
          secondaryNavItems={secondaryNavItems}
        />
      </nav>
      <MobileNavigation
        header={header}
        primaryNavItems={primaryNavItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        secondaryNavItems={secondaryNavItems}
      />
    </header>
  );
}
