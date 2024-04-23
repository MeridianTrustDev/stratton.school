import qs from "qs";
import React from "react";

export default async function Sidebar() {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
      type: {
        equals: "primary",
      },
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/navigation${stringifiedQuery}&depth=2`
    );

    return (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }

  return <div>Sidebar</div>;
}
