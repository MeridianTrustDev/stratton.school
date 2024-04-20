import { payload } from "@/lib/payload";
import React from "react";
import qs from "qs";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";

export default async function Home({ params: { slug = "home" } }) {
  let page = null;
  try {
    const query = {
      type: {
        equals: "home",
      },
      "tenant.name": {
        equals: "Stratton School",
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

  return (
    <>
      <div className="h-[99vh] w-[100vw] relative">
        <Hero slides={page.hero.slides} />
      </div>
      <Separator className="h-[10px] bg-[#D9B21D]" />
    </>
  );
}
