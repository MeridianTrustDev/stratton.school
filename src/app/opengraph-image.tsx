import { ImageResponse } from "next/og";
import qs from "qs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
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
    return;
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {page.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
