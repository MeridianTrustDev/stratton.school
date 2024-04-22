import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import RenderBlocks from "@/components/Blocks/RenderBlocks";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params: { slug } }: Props) {
  let page = null;
  try {
    const query = {
      slug: {
        equals: slug,
      },
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}`
    );

    page = (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }

  return (
    <div className="max-w-8xl px-4 py-2">
      <h1 className="text-4xl font-bold uppercase">{page.title}</h1>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  let page = null;
  try {
    const query = {
      slug: {
        equals: slug,
      },
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}`
    );

    page = (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
  }

  return {
    title: page.meta.title || page.title,
    description: page.meta.description,
    openGraph: {
      images: [
        ...(page.meta.image
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.meta.image.url}`,
                width: page.meta.image.width,
                height: page.meta.image.height,
                alt: page.meta.image.alt,
              },
            ]
          : page.featuredImage
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${page.featuredImage.url}`,
                width: page.featuredImage.width,
                height: page.featuredImage.height,
                alt: page.featuredImage.alt,
              },
            ]
          : []),
      ],
    },
  };
}

export async function generateStaticParams() {
  try {
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}`
    );

    const { docs } = await response.json();

    return docs.map(({ slug }: { slug: string }) => slug);
  } catch (error) {
    console.log(error);
    return;
  }
}
