import qs from "qs";

export const getPage = async (slug: string) => {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      _status: {
        equals: "published",
      },
      slug: {
        equals: slug,
      },
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages${stringifiedQuery}&depth=2`
    );

    return (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }
};
