import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG card. Rendered at build time for this static route, so there is
 * no runtime cost — and it works identically on Vercel and on the VPS.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06080b",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* cobalt bloom */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 240,
            width: 900,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(47,111,240,0.42), transparent)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 4,
              height: 48,
              background: "#6a9bff",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#6d7a8b",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Development Studio · Lahore
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#f4f6f9",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.02,
              maxWidth: 940,
              display: "flex",
            }}
          >
            We build what the brief actually needed.
          </div>

          <div
            style={{
              color: "#aab5c4",
              fontSize: 30,
              maxWidth: 820,
              display: "flex",
            }}
          >
            Web platforms · Flutter apps · SEO &amp; digital marketing
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1f2836",
            paddingTop: 28,
          }}
        >
          <div
            style={{ color: "#f4f6f9", fontSize: 28, fontWeight: 600, display: "flex" }}
          >
            Aliph Studio
          </div>
          <div style={{ color: "#6d7a8b", fontSize: 24, display: "flex" }}>
            aliph.studio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
