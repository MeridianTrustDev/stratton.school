import qs from "qs";

export const getHouses = async () => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/houses${stringifiedQuery}&depth=2`
    );

    return (await response.json()).docs;
  } catch (error) {
    console.log(error);
    return;
  }
};
