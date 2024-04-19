"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteHeader({ header }: { header: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const primaryNavItems = header.primaryNavigation.navItems;

  return (
    <header className="fixed z-20 w-full">
      <nav
        className="mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex">
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
        </div>
        {!mobileMenuOpen && (
          <div className="flex w-full justify-end lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
        )}
        <Popover.Group className="hidden lg:flex flex-wrap justify-end lg:gap-x-12">
          {primaryNavItems.length > 0 &&
            primaryNavItems.map((item: any) => (
              <Popover
                key={item.id}
                onMouseEnter={() => setIsShowing(true)}
                onMouseLeave={() => setIsShowing(false)}
                className="relative"
              >
                <Popover.Button className="flex items-center gap-x-1 text-md font-bold uppercase leading-6 text-white">
                  {item.label}
                  <ChevronDown
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  show={isShowing}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                    {item.children.length > 0 &&
                      item.children.map((child: any) => (
                        <a
                          key={child.id}
                          href={child.url}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                        >
                          {child.label}
                        </a>
                      ))}
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
        </Popover.Group>
      </nav>
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
                                  className={classNames(
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
    </header>
  );
}
