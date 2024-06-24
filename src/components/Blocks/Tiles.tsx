import { BookOpen, icons } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Tiles({ tiles }: any) {
  return (
    <div className="flex flex-wrap gap-4">
      {tiles.map((tile: any, index: any) => {
        const Icon = icons[tile.icon as keyof typeof icons];

        icons["BookOpen"];

        return (
          <Link
            key={tile.id}
            href={
              tile.target === "reference"
                ? tile.reference.slug
                  ? `/${tile.reference.slug}`
                  : "#"
                : tile.url
                ? tile.url
                : "#"
            }
            style={{
              background: tile.backgroundColour || "#4EBCC1",
            }}
            className="text-white text-center group uppercase h-32 w-32 hover:scale-[102%] transition-all ease-in-out font-semibold text-base flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
          >
            {Icon && <Icon className="w-10 h-10" />}
            <span className="">{tile.text}</span>
          </Link>
        );
      })}
    </div>
  );
}
