"use client";

import { Dialog, Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Stratton School</span>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${header.logo.url}`}
              width={header.logo.width}
              height={header.logo.height}
              alt={header.logo.alt}
              className="resize-none max-w-60"
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            {primaryNavItems.length > 0 &&
              primaryNavItems.map((item: any) => (
                <div className="space-y-2 py-6">
                  {item.children.length > 0 ? (
                    item.children.map((child: any) => (
                      <Disclosure as="div" className="-mx-3">
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
                              {primaryNavItems.length > 0 &&
                                primaryNavItems.map((item: any) => (
                                  <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </Disclosure.Button>
                                ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))
                  ) : (
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white transition-all hover:bg-neutral-900"
                    >
                      Log in
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
