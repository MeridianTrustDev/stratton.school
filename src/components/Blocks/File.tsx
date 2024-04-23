import { blocks } from "@/blocks/blockList";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function File({ mode, files }: any) {
  if (mode === "named") {
    return (
      <div className="flex w-full items-center justify-center gap-2 flex-wrap">
        {files.map((file: any, index: any) => {
          const fileType = file.reference.url.split(".").pop();

          if (file.embed) {
            return (
              <object
                data={`${process.env.NEXT_PUBLIC_BACKEND_URL}${file.reference.url}`}
                type="application/pdf"
                className="h-[100vh]"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href="http://africau.edu/images/default/sample.pdf">
                    to the PDF!
                  </a>
                </p>
              </object>
            );
          }

          return (
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${file.reference.url}`}
              className="flex-1 h-18 bg-gray-100 p-4 flex items-center gap-4 text-xl hover:bg-gray-200 transition-all"
            >
              <FileText size={30} className="text-red-700" />
              <div className="justify-between w-full flex font-semibold uppercase tracking-wide items-center">
                <p className="whitespace-nowrap">
                  {file.name}
                  {fileType && (
                    <span className="text-sm font-light lowercase">{`.${fileType}`}</span>
                  )}
                </p>
                <span className="text-gray-600 font-light text-sm">
                  {(file.reference.filesize / 1000).toFixed()}KB
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
