import { blocks } from "@/blocks/blockList";
import { getFiles } from "@/lib/payload/files";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function File({ mode, category, files }: any) {
  if (mode === "byCategory") {
    files = await getFiles(category.name);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2 flex-wrap py-4">
      {files.map((file: any, index: any) => {
        return (
          <div key={file.id} className="flex-1 flex flex-col w-full">
            {file.embed && (
              <object
                data={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
                  mode === "byCategory"
                    ? file.url
                      ? file.url
                      : "#"
                    : file.reference.url
                    ? file.reference.url
                    : "#"
                }`}
                type="application/pdf"
                className="h-[100vh]"
                width="100%"
                height="100%"
                key={`${file.id}-embed`}
              />
            )}
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
                mode === "byCategory"
                  ? file.url
                    ? file.url
                    : "#"
                  : file.reference.url
                  ? file.reference.url
                  : "#"
              }`}
              className="flex-1 h-18 bg-gray-100 w-full p-4 flex items-center gap-4 text-xl hover:bg-gray-200 transition-all"
            >
              <div>
                <FileText size={30} />
              </div>
              <div className="justify-between flex font-semibold uppercase tracking-wide items-center">
                <p className="">
                  {mode === "byCategory" ? file.alt : file.reference.alt}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
