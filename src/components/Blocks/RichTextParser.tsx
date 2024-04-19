import serializeLexicalRichText from "@/components/Blocks/serializeLexicalRichText";
import React from "react";

export default function ({
  className,
  content,
  customClassNames,
}: {
  className?: string;
  content: any;
  customClassNames?: Record<string, string>;
}) {
  if (!content?.root?.children) return "";

  return (
    <div className={`${[className].filter(Boolean).join(" ")} richText`}>
      {serializeLexicalRichText({
        children: content.root.children,
        customClassNames,
      })}
    </div>
  );
}
