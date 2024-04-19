import RichTextParser from "@/components/Blocks/RichTextParser";

export default function Text({ text }: any) {
  return (
    <div>
      <RichTextParser content={text} />
    </div>
  );
}
