"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function Vacancies({ myNewTermID }: { myNewTermID: string }) {
  useEffect(() => {
    let mntInitCounter = 0;

    const mntApiScript = document.createElement("script");
    mntApiScript.type = "text/javascript";
    mntApiScript.src =
      "https://api.mynewterm.com/assets/v1/dist/js/school_vacancies.js?v=" +
      new Date().getTime();

    mntApiScript.onload = () => {
      if (mntInitCounter === 0) {
        mntInitCounter = 1;
        // @ts-ignore
        if (typeof mntSchoolVacancies === "function") {
          // @ts-ignore
          mntSchoolVacancies(myNewTermID, 1);
        } else {
          console.error("mntSchoolVacancies function is not available");
        }
      }
    };

    document.body.appendChild(mntApiScript);

    return () => {
      document.body.removeChild(mntApiScript);
    };
  }, []);
  return (
    <div id="mnt-parent-container" className="w-[96.7%] bg-transparent"></div>
  );
}
