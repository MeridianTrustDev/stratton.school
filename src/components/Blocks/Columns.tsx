import { blocks } from "@/blocks/blockList";
import React from "react";

export default function Columns({ columns }: any) {
  return (
    <div className="flex">
      {columns &&
        columns.length > 0 &&
        columns.map((column: any, index: number) => {
          return (
            <div key={index} className="flex-1">
              {column.content.map((block: any, index: number) => {
                const Block = blocks[block.blockType as keyof typeof blocks];
                if (Block) {
                  return <Block key={index} {...block} />;
                }
                return null;
              })}
            </div>
          );
        })}
    </div>
  );
}
