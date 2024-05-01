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
import Head from "next/head";

interface PageParams {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageParams) {
  const news = await getNews(slug);

  if (!news) {
    return notFound();
  }

  return (
    <div className="max-w-7xl p-4 w-full flex flex-col md:flex-row-reverse justify-center md:justify-start gap-4 bg-white">
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/news/${news.slug}`}
          key="canonical"
        />
      </Head>
      <div className="w-full md:w-1/4 flex justify-center max-h-64">
        {news.featuredImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${news.featuredImage.url}`}
            width={news.featuredImage.width}
            height={news.featuredImage.height}
            alt={news.featuredImage.alt}
            className="object-contain"
          />
        )}
        {/* <Sidebar /> */}
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/news`}>News</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`${news.slug}`} className="truncate w-72">
                {news.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold uppercase text-left">{news.title}</h1>
        <RenderBlocks layout={news.layout} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { slug },
}: PageParams): Promise<Metadata> {
  const news = await getNews(slug);
  return {
    title: news.title,
    // openGraph: {
    //   images: [
    //     ...(page.meta.image
    //       ? [
    //           {
    //             url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.meta.image.url}`,
    //             width: page.meta.image.width,
    //             height: page.meta.image.height,
    //             alt: page.meta.image.alt,
    //           },
    //         ]
    //       : page.featuredImage
    //       ? [
    //           {
    //             url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.featuredImage.url}`,
    //             width: page.featuredImage.width,
    //             height: page.featuredImage.height,
    //             alt: page.featuredImage.alt,
    //           },
    //         ]
    //       : []),
    //   ],
    // },
  };
}

export async function generateStaticParams() {
  const news = await getNews();

  return news.map((news: any) => ({
    slug: news.slug,
  }));
}
