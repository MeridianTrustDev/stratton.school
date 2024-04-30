import qs from "qs";

export const getHeader = async () => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/headers${stringifiedQuery}&depth=4`,
      {
        next: {
          tags: ["navigation"],
        },
      }
    );

    return (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }
};
