"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { cookieConsentGiven } from "./CookieBanner";

export function PHProvider({ children }: any) {
  if (typeof window !== "undefined") {
    posthog.init("phc_OfiZip3B7Py5olSutMd9PjfCnpmXMYk98cENeAXTnEb", {
      api_host: "https://eu.i.posthog.com",
      persistence:
        cookieConsentGiven() === "yes" ? "localStorage+cookie" : "memory",
      capture_pageleave: true, // Enable automatic pageleave capture
    });
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
