import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  console.log("Revalidating", { path, tag, secret });

  if (secret !== process.env.REVALIDATION_KEY) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid secret",
    });
  }

  if (path) {
    revalidatePath(`/${path}`);
    console.log("Revalidated path", path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  if (tag) {
    revalidateTag(tag);
    console.log("Revalidated tag", tag);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
