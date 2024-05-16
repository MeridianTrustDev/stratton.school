import RichTextParser from "@/components/Blocks/RichTextParser";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MediaAndText(props: any) {
  return (
    <div
      className={
        "flex flex-col md:flex-row md:items-center text-left p-4 w-full h-full"
      }
    >
      <div className="flex max-h-40 justify-center w-full md:w-1/3 md:h-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${props.media.url}`}
          width={props.media.width}
          height={props.media.height}
          alt={props.media.alt}
          className={`py-2 object-contain`}
        />
      </div>

      <RichTextParser
        content={props.text}
        className="w-full md:w-2/3 text-center md:text-left"
      />
    </div>
  );
}
