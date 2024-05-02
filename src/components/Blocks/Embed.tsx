import React from "react";

export default async function Embed({ embed }: any) {
  return <div dangerouslySetInnerHTML={{ __html: embed }} />;
}
