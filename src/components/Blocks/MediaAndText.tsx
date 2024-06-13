import RichTextParser from "@/components/Blocks/RichTextParser";
import { cn, navItemUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MediaAndText(props: any) {
  return (
    <div
      className={
        "flex flex-col md:flex-row items-center justify-center text-left p-4 w-full h-full gap-8"
      }
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${props.media.url}`}
        width={props.media.width}
        height={props.media.height}
        alt={props.media.alt}
        className={`py-2 object-contain h-full w-52`}
      />

      <div className="flex-1 flex flex-col w-full md:gap-4 justify-center items-center md:items-start">
        <RichTextParser
          content={props.text}
          className="text-center md:text-left flex flex-col justify-center "
        />

        {props.readMore?.showReadMore && (
          <Link
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "w-32",
            })}
            href={
              props.readMore.readMoreLink.target === "page"
                ? `/${props.readMore.readMoreLink.page.slug}`
                : props.readMore.readMoreLink.url
            }
          >
            {props.readMore.readMoreText}
          </Link>
        )}
      </div>
    </div>
  );
}
