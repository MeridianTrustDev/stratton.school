// app/banner.js
"use client";
import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { buttonVariants } from "./ui/button";
import { Cookie } from "lucide-react";

export function cookieConsentGiven() {
  if (!localStorage.getItem("cookie_consent")) {
    return "undecided";
  }
  return localStorage.getItem("cookie_consent");
}

export default function Banner() {
  const [consentGiven, setConsentGiven] = useState<string | null>(null);
  const posthog = usePostHog();

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven(cookieConsentGiven());
  }, []);

  useEffect(() => {
    if (consentGiven !== "") {
      posthog.set_config({
        persistence: consentGiven === "yes" ? "localStorage+cookie" : "memory",
      });
    }
  }, [consentGiven]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "yes");
    setConsentGiven("yes");
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookie_consent", "no");
    setConsentGiven("no");
  };

  if (consentGiven === "undecided") {
    return (
      <div className="fixed z-40 bg-white border-2 border-black bottom-0 right-0 w-96 p-4 rounded-2xl text-center m-8 shadow-2xl">
        <div className="flex flex-col gap-4 items-center w-full">
          <Cookie size={40} />
          <p>
            We use cookies to understand how you use the site and to help us
            improve it.
          </p>
          <div className="flex gap-2 w-full justify-center">
            <button
              className={buttonVariants({ variant: "outline" })}
              type="button"
              onClick={handleAcceptCookies}
            >
              Accept cookies
            </button>
            <button
              className={buttonVariants({ variant: "outline" })}
              type="button"
              onClick={handleDeclineCookies}
            >
              Decline cookies
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
