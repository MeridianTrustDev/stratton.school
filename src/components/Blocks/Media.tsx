import Image from "next/image";

export default function Media({ media }: { media: any }) {
  return (
    <div className="flex w-full md:justify-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${media.url}`}
        width={media.width}
        height={media.height}
        alt={media.alt}
        className={`py-2 object-contain`}
      />
    </div>
  );
}
