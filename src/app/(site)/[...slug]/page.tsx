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
import { getPage } from "@/lib/payload/page";
import { getHeader } from "@/lib/payload/header";
import Sidebar from "@/components/Sidebar";

interface PageParams {
  params: { slug: string[] };
}

export default async function Page({ params: { slug } }: PageParams) {
  const lastSlug = slug[slug.length - 1];

  const page = await getPage(lastSlug);

  if (!page) {
    return notFound();
  }

  let parent = null;

  if (page.breadcrumbs?.length > 0) {
    const header = await getHeader();

    parent = header.primaryNavigation.navItems.filter((item: any) => {
      if (item.reference && item.reference.id && page.breadcrumbs[0]) {
        return item.reference.id === page.breadcrumbs[0].doc;
      } else {
        return false;
      }
    })[0];
  }

  return (
    <div className="pt-40 p-4 px-10 w-full flex flex-col md:flex-row-reverse justify-center md:justify-start gap-4 bg-white">
      <div className="w-full md:w-1/4 flex flex-col gap-4 z-10">
        {page.featuredImage && (
          <img
            src={page.featuredImage.url}
            width={page.featuredImage.width}
            height={page.featuredImage.height}
            alt={page.featuredImage.alt}
            className="object-contain"
          />
        )}
        {parent && (
          <Sidebar className={`hidden md:flex flex-col`} parent={parent} />
        )}
      </div>
      <div className="w-full md:w-3/4 flex flex-col z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {page.breadcrumbs?.length > 0 ? (
              page.breadcrumbs?.map((crumb: any, index: number) => (
                <div
                  key={`${crumb.label}-${index}`}
                  className="flex gap-1.5 sm:gap-2.5 items-center justify-center"
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`${crumb.url}`}>
                      {crumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== page.breadcrumbs?.length - 1 && (
                    <BreadcrumbSeparator key={`separator-${index}`} />
                  )}
                </div>
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
        <h1 className="text-4xl font-bold uppercase text-left my-4">
          {page.title}
        </h1>
        <RenderBlocks layout={page.layout} />
      </div>
      {/* <Icons.Stratton className="absolute w-[80vh] hidden md:block md:top-10 left-0 opacity-[0.02]" /> */}
      {parent && (
        <Sidebar className={`flex flex-col md:hidden`} parent={parent} />
      )}
    </div>
  );
}

export async function generateMetadata({
  params: { slug },
}: PageParams): Promise<Metadata> {
  const lastSlug = slug[slug.length - 1];

  const page = await getPage(lastSlug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page?.meta?.title || page.title,
    description: page?.meta?.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${page.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@StrattonSchoolBeds",
      title: page?.meta?.title || page.title,
      description: page?.meta?.description || "",
      // image: page.meta.image
      //   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.meta.image.url}`
      //   : page.featuredImage
      //   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.featuredImage.url}`
      //   : undefined,
    },
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=0&limit=10000&select[0]=slug`
  )?.then((res) => res.json()?.then((data) => data.docs));

  console.log(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=0&limit=10000&select[0]=slug`
  );

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
