import { blocks } from "@/blocks/blockList";

const RenderBlocks = ({ layout }: any) => (
  console.log(layout),
  (
    <div>
      {layout.map((block: any, index: any) => {
        const Block = blocks[block.blockType as keyof typeof blocks];
        if (Block) {
          return <Block key={index} {...block} />;
        }
        return null;
      })}
    </div>
  )
);

export default RenderBlocks;
