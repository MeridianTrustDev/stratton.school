import { getFooter } from "@/lib/payload/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const footer = await getFooter();

  return (
    <div className="w-full bg-[#232323] flex flex-col items-center p-4 antialiased gap-4 z-20">
      <div className="flex flex-col  md:flex-row w-full items-center justify-center gap-4 md:gap-12">
        {footer.logo && (
          <img
            src={footer.logo.url}
            width={footer.logo.width}
            height={footer.logo.height}
            alt={footer.logo.alt}
            className="object-contain w-64 md:order-2"
          />
        )}
        <div className="text-center uppercase font-bold text-white flex-col flex gap-2 md:order-1 md:text-right flex-1">
          <h4 className="underline underline-offset-4">Contact Us</h4>
          <div className="text-sm font-bold">
            <a href={`tel:${footer.telephone}`}>{footer.telephone}</a>
            <br />
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
            <br />
            {footer.address}
          </div>
        </div>
        <div className="text-center uppercase font-bold text-white flex-col flex gap-2 md:order-3 md:text-left flex-1">
          <h4 className="underline underline-offset-4">Quick Links</h4>
          <ul className="text-sm font-bold">
            {footer.primaryNavigation.navItems.map((link: any) => {
              return (
                <li key={link.id}>
                  <Link
                    prefetch={false}
                    href={
                      link.type === "custom"
                        ? link.url
                          ? link.url
                          : "#"
                        : `${process.env.NEXT_PUBLIC_BASE_URL}/${link.reference.slug}`
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="text-center uppercase text-xs w-full md:w-[700px]">
        <div className="text-white opacity-50">
          {footer.disclaimer.split("\n").map((str: any, index: number) => (
            <p key={index}>{str}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
