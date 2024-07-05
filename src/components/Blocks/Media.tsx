import Image from "next/image";

export default function Media({ media }: { media: any }) {
  return (
    <div className="flex w-full md:justify-center">
      {media.url && (
        <Image
          src={media.url}
          width={media.width}
          height={media.height}
          alt={media.alt}
          className={`py-2 object-contain`}
        />
      )}
    </div>
  );
}
