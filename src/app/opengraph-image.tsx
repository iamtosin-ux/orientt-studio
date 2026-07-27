import { ImageResponse } from "next/og";
import { DEFAULT_TITLE, TAGLINE } from "@/lib/seo";

export const alt = DEFAULT_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card — dark ground, wordmark, tagline, location line.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b0b0c 0%, #141416 60%, #1c1c20 100%)",
          padding: "80px",
          color: "#f0f0f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            O
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>orientt</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {TAGLINE}
          </div>
          <div style={{ fontSize: 30, color: "#9a9aa2", fontWeight: 500 }}>
            Independent design studio · London · Hertfordshire · England
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
