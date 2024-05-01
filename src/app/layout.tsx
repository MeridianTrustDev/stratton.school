import type { Metadata } from "next";
import "./globals.css";
import { payload } from "@/lib/payload";
import SiteHeader from "@/components/SiteHeader";
import { Poppins } from "next/font/google";
import type { Header as PayloadHeader } from "@/types/payload";
import Footer from "@/components/Footer";
import { getHeader } from "@/lib/payload/header";
import { getFooter } from "@/lib/payload/footer";

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
    <html lang="en">
      <body
        className={`flex flex-col ${poppins.variable} items-center w-screen overflow-x-hidden bg-black`}
      >
        <SiteHeader header={siteHeader} />
        <main className="min-h-[63vh] w-full flex flex-col items-center bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
