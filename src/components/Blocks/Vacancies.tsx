"use client";

import Script from "next/script";

export default function Vacancies({ myNewTermID }: { myNewTermID: string }) {
  return (
    <>
      {/* <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `var mntInitCounter = 0, mntApiScript = document.createElement("script");
  mntApiScript.type = "text/javascript";
  mntApiScript.src = "https://api.mynewterm.com/assets/v1/dist/js/school_vacancies.js?v=" + (new Date().getTime());
  document.body.appendChild(mntApiScript);

  window.onload = function () {
    if(document.readyState == 'complete' && mntInitCounter === 0) {
        mntInitCounter = 1;
        mntSchoolVacancies('${myNewTermID}', 1);
    }
  };`,
        }}
      /> */}
      <div id="mnt-parent-container" className="w-[96.7%] bg-transparent"></div>
    </>
  );
}
