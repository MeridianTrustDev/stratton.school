import qs from "qs";

export const getFiles = async (category?: string) => {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      ...(category && {
        "categories.category.name": {
          equals: "Safeguarding",
        },
      }),
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
        sort: "name",
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media${stringifiedQuery}&depth=2`
    );

    return (await response.json()).docs;
  } catch (error) {
    console.log(error);
    return;
  }
};
