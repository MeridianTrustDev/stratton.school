import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import RenderBlocks from "@/components/Blocks/RenderBlocks";

export default async function Page({ params: { slug = "home" } }) {
  let page = null;
  try {
    const query = {
      slug: {
        equals: slug,
      },
      // This query could be much more complex
      // and QS would handle it beautifully
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await payload.get(`/api/pages${stringifiedQuery}`);

    page = response.data.docs[0];
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(page);

  return (
    <div className="max-w-8xl px-4 py-2">
      <h1 className="text-4xl font-bold uppercase">{page.title}</h1>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}
