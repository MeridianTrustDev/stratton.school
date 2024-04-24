import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { Metadata, ResolvingMetadata } from "next";
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
import { getPage } from "@/lib/payload/page";

interface PageParams {
  params: { slug: string[] };
}

export default async function Page({ params: { slug } }: PageParams) {
  const lastSlug = slug[slug.length - 1];

  const page = await getPage(lastSlug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="max-w-7xl p-4 w-full flex flex-col md:flex-row-reverse justify-center md:justify-start gap-4">
      <div className="w-full md:w-1/4 flex justify-center max-h-64">
        {page.featuredImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${page.featuredImage.url}`}
            width={page.featuredImage.width}
            height={page.featuredImage.height}
            alt={page.featuredImage.alt}
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
            {page.breadcrumbs.length > 0 ? (
              page.breadcrumbs.map((crumb: any, index: number) => (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`${crumb.url}`}>
                      {crumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== page.breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </>
              ))
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={`${page.slug}`}>
                  {page.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold uppercase text-left">{page.title}</h1>
        <RenderBlocks layout={page.layout} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { slug },
}: PageParams): Promise<Metadata> {
  const lastSlug = slug[slug.length - 1];

  const page = await getPage(lastSlug);

  return {
    title: page.meta.title || page.title,
    description: page.meta.description,
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
  let paths: Paths = [];

  const query = {
    "tenant.name": {
      equals: "Stratton School",
    },
    type: {
      not_equals: "home",
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const pages = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=0`
  )?.then((res) => res.json()?.then((data) => data.docs));

  if (pages && Array.isArray(pages) && pages.length > 0) {
    paths = pages.map((page) => {
      const { slug, breadcrumbs } = page;

      let slugs = [slug];

      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

      if (hasBreadcrumbs) {
        slugs = breadcrumbs
          .map((crumb) => {
            const { url } = crumb;
            let slug: string = "";

            if (url) {
              const split = url.split("/");
              slug = split[split.length - 1];
            }

            return slug;
          })
          ?.filter(Boolean);
      }

      return { slug: slugs };
    });
  }

  return paths;
}
