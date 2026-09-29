"use client";

import { useEffect } from "react";

// Pings /api/page-view (which emails a notification) once per browser session.
// Visit the page once with ?me=1 to mark this browser as yours and stop
// notifying on your own visits (?me=0 undoes it).
export function trackEvent(event: "view" | "video-play", detail?: string) {
  try {
    const params = new URLSearchParams(location.search);
    if (params.get("me") === "1") localStorage.setItem("orientt:me", "1");
    if (params.get("me") === "0") localStorage.removeItem("orientt:me");
    if (localStorage.getItem("orientt:me")) return;

    const onceKey = `orientt:tracked:${location.pathname}:${event}:${detail ?? ""}`;
    if (sessionStorage.getItem(onceKey)) return;
    sessionStorage.setItem(onceKey, "1");
  } catch {
    // storage blocked (private mode etc.) — still report
  }

  const payload = JSON.stringify({
    path: location.pathname,
    event,
    detail,
    referrer: document.referrer,
  });
  if (!navigator.sendBeacon?.("/api/page-view", new Blob([payload], { type: "application/json" }))) {
    fetch("/api/page-view", { method: "POST", body: payload, keepalive: true }).catch(() => {});
  }
}

export default function PageViewTracker() {
  useEffect(() => {
    trackEvent("view");
  }, []);
  return null;
}
