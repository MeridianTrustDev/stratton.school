import type { Metadata } from "next";
import "./globals.css";
import { payload } from "@/lib/payload";
import SiteHeader from "@/components/SiteHeader";
import { Poppins } from "next/font/google";
import type { Header as PayloadHeader } from "@/types/payload";

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
    "Stratton School is a mixed British upper school and sixth form located in Biggleswade, Bedfordshire. It is an academy school, governed by Meridian Trust.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await payload.get(`/api/headers?depth=2`);

  const siteHeader: PayloadHeader = response.data.docs[0];

  return (
    <html lang="en">
      <body
        className={`flex flex-col ${poppins.variable} items-center w-screen overflow-x-hidden`}
      >
        <SiteHeader header={siteHeader} />
        {children}
      </body>
    </html>
  );
}
