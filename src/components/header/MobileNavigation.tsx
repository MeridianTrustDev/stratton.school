"use client";

import { Dialog, Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { cn, navItemUrl } from "@/lib/utils";

export default function MobileNavigation({
  header,
  primaryNavItems,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  header: any;
  primaryNavItems: any;
  mobileMenuOpen: any;
  setMobileMenuOpen: any;
}) {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 mt-20 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="mt-6 flow-root">
          {primaryNavItems.length > 0 &&
            primaryNavItems.map((item: any) => {
              item.url = navItemUrl(item);
              return (
                <div key={item.id}>
                  {item.children.length > 0 ? (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white transition-all hover:bg-neutral-900">
                            {item.label}
                            <ChevronDown
                              className={cn(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {item.children.length > 0 &&
                              item.children.map((child: any) => (
                                <Link
                                  onClick={() => setMobileMenuOpen(false)}
                                  href={child.url}
                                  className="flex w-full items-center justify-between rounded-lg py-2 pl-8 pr-3.5 text-sm font-semibold leading-5 text-white transition-all hover:bg-neutral-900"
                                >
                                  {child.label}
                                </Link>
                              ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      href={item.url}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white transition-all hover:bg-neutral-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
