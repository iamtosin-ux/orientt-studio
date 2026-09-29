import { NextResponse, type NextRequest } from "next/server";

// Emails a notification when a tracked page is opened (or its video played).
// Fired by <PageViewTracker /> from the browser, so link-preview bots (Slack,
// iMessage, LinkedIn) that don't run JS never trigger it.
//
// Needs RESEND_API_KEY and NOTIFY_EMAIL (see .env.example). Without them it
// does nothing, so local dev and preview deploys stay quiet.

// Only these pages can trigger an email — keeps the endpoint from being used
// to send arbitrary messages.
const TRACKED: Record<string, string> = {
  "/trymona": "Andrew & Anny (Mona)",
};

const EVENTS = { view: "opened", "video-play": "played a video on" } as const;
type EventName = keyof typeof EVENTS;

const BOT_UA = /bot|crawl|spider|preview|slurp|facebookexternalhit|headless|lighthouse/i;

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  let body: { path?: string; event?: string; referrer?: string; detail?: string };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const path = body.path ?? "";
  const label = TRACKED[path];
  const event = (body.event ?? "view") as EventName;
  const ua = req.headers.get("user-agent") ?? "";
  if (!label || !(event in EVENTS) || BOT_UA.test(ua)) {
    return new NextResponse(null, { status: 204 });
  }
  if (!key || !to) return new NextResponse(null, { status: 204 });

  const h = req.headers;
  const city = decodeURIComponent(h.get("x-vercel-ip-city") ?? "");
  const region = h.get("x-vercel-ip-country-region") ?? "";
  const country = h.get("x-vercel-ip-country") ?? "";
  const location = [city, region, country].filter(Boolean).join(", ") || "Unknown";
  const referrer = (body.referrer ?? "").slice(0, 300) || "Direct / none";
  const detail = (body.detail ?? "").slice(0, 120);
  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `👀 Someone ${EVENTS[event]} ${path}${detail ? ` — ${detail}` : ""}`;
  const lines = [
    `Page: ${path} (${label})`,
    `Event: ${EVENTS[event]}${detail ? ` — ${detail}` : ""}`,
    `Time: ${time} (London)`,
    `Location: ${location}`,
    `Referrer: ${referrer}`,
    `Device: ${ua.slice(0, 200)}`,
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM ?? "Orientt Tracker <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) console.error("page-view email failed", res.status, await res.text());
  return new NextResponse(null, { status: 204 });
}
