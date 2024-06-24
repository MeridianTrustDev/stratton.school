import React from "react";
import qs from "qs";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getNews } from "@/lib/payload/news";
import { Newspaper } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Head from "next/head";

interface PageParams {
  params: { slug: string };
}

export default async function Page() {
  const news = await getNews();

  return (
    <div className="max-w-7xl pt-40  p-4 w-full flex flex-col md:justify-start gap-4 bg-white">
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/news`}
          key="canonical"
        />
      </Head>
      <div className="w-full flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/news`}>News</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold uppercase text-left">News</h1>
        <div className="flex w-full gap-4 flex-wrap">
          {news.map((news: any) => {
            return (
              <div
                key={news.id}
                className="bg-[#D9B21D] w-1/2 -ml-2 md:basis-1/3 group lg:basis-1/4 h-72 p-2 "
              >
                <Link
                  href={`/news/${news.slug}`}
                  className="w-full h-full flex flex-col items-center justify-between "
                >
                  {news.featuredImage && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${news.featuredImage.url}`}
                      alt={news.featuredImage.alt}
                      width={200}
                      height={200}
                      className="w-full h-1/2 object-cover self-start"
                    />
                  )}
                  <h3 className="text-white text-center font-medium tracking-wide text-xl line-clamp-2 w-full">
                    {news.title}
                  </h3>
                  <div className="flex justify-between w-full items-center">
                    <Newspaper
                      className="text-[#86732A] group-hover:text-white transition-all ease-in-out"
                      size={32}
                    />
                    <p className="uppercase flex gap-1 text-4xl font-bold self-end text-white">
                      {format(new Date(news.createdAt), "d")}
                      <span className="text-[#86732A]">
                        {format(new Date(news.createdAt), "MMM")}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
