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

  console.log(news);

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

type Path = {
  slug: string[];
};

type Paths = Path[];

export async function generateStaticParams() {
  const query = {
    "tenant.name": {
      equals: "Stratton School",
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const pages = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news${stringifiedQuery}&depth=2`
  )?.then((res) => res.json()?.then((data) => data.docs));

  return pages.map((post: any) => ({
    slug: post.slug,
  }));
}
