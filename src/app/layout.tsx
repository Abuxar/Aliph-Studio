import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { RevealEngine } from "@/components/providers/reveal-engine";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Fonts are self-hosted by next/font at build time — no round trip to Google,
 * no layout shift, and it works identically on Vercel and on the VPS.
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#06080b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        {/* Drop the no-js class before paint so reveal elements can start
            hidden. Without this, a JS-disabled visitor would see nothing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <SmoothScroll>
          <RevealEngine />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
