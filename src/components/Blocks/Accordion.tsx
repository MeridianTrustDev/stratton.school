import React from "react";
import {
  Accordion as AccordionComponent,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import RichTextParser from "./RichTextParser";
import RenderBlocks from "./RenderBlocks";
import { blocks } from "@/blocks/blockList";

export default function Accordion({ items }: any) {
  return (
    <AccordionComponent type="single" collapsible>
      {items.map((item: any, index: number) => (
        <AccordionItem key={`${item.title}-${item.number}`} value={item.title}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <div>
              {item.content.map((block: any, index: any) => {
                const Block = blocks[block.blockType as keyof typeof blocks];
                if (Block) {
                  return <Block key={index} {...block} />;
                }
                return null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionComponent>
  );
}
