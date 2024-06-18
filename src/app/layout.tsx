import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { Poppins } from "next/font/google";
import type { Header as PayloadHeader } from "@/types/payload";
import Footer from "@/components/Footer";
import { getHeader } from "@/lib/payload/header";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import Head from "next/head";
import { PHProvider } from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";
import PostHogPageView from "@/components/PostHogPageView";
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Stratton School",
    template: "%s | Stratton School",
  },
  description:
    "Stratton School is a mixed British secondary school and sixth form located in Biggleswade, Bedfordshire. It is an academy school, governed by Meridian Trust.",
  verification: {
    google: "",
  },
  category: "education",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteHeader: PayloadHeader = await getHeader();

  return (
    <html lang="en" suppressHydrationWarning>
      <PHProvider>
        <body
          className={`flex flex-col ${poppins.variable} items-center w-screen overflow-x-hidden bg-black`}
        >
          <Suspense>
            <PostHogPageView />
          </Suspense>

          <SiteHeader header={siteHeader} />
          <main className="min-h-[63vh] w-full flex flex-col items-center bg-white">
            {children}
          </main>
          <Footer />
          {/* <Link
          href="https://meridiantrust.co.uk"
          target="_blank"
          className="flex flex-col gap-1 drop-shadow-lg hover:-translate-y-1 ease-in-out transition-all tracking-wide text-center text-sm fixed m-4 bottom-0 right-0 bg-white rounded-xl z-30 p-2 md:px-4 py-2 items-center justify-center"
        >
          <span className="hidden md:block">Proud to be part of</span>
          <Icons.MeridianTrust className="w-36 hidden md:block" />
          <Icons.MeridianTrustNoText className="w-10 md:hidden" />
        </Link> */}
          <CookieBanner />
        </body>
      </PHProvider>
    </html>
  );
}
