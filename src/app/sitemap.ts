import { MetadataRoute } from "next";
import qs from "qs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      limit: 1000,
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&limit=1000&depth=0`,
      {
        next: {
          tags: ["sitemap"],
        },
      }
    );

    const { docs } = await response.json();

    const pageEntries: MetadataRoute.Sitemap = docs.map(
      ({ slug, updatedAt }: { slug: string; updatedAt: string }) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
        lastModified: new Date(updatedAt),
      })
    );

    return pageEntries;
  } catch (error) {
    console.log(error);
    return [];
  }
}
