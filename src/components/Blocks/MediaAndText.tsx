import RichTextParser from "@/components/Blocks/RichTextParser";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MediaAndText({
  mediaPosition,
  media,
  text,
}: {
  mediaPosition: string;
  media: any;
  text: any;
}) {
  return (
    <div
      className={
        "flex flex-col md:flex-row md:items-center text-left py-4 w-full"
      }
    >
      <div className="flex w-full md:w-1/3 md:justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${media.url}`}
          width={media.width}
          height={media.height}
          alt={media.alt}
          className={`py-2 object-contain`}
        />
      </div>

      <RichTextParser content={text} className="w-full md:w-2/3" />
    </div>
  );
}
