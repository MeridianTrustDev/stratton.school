import qs from "qs";

export const getNews = async (slug?: string) => {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      _status: {
        equals: "published",
      },
      ...(slug && {
        slug: {
          equals: slug,
        },
      }),
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news${stringifiedQuery}&depth=2`,
      {
        next: {
          tags: ["news"],
        },
      }
    );

    return slug
      ? (await response.json()).docs[0]
      : (await response.json()).docs;
  } catch (error) {
    console.log(error);
    return;
  }
};
