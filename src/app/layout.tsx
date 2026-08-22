import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { RevealEngine } from "@/components/providers/reveal-engine";
import { AppearEngine } from "@/components/providers/appear-engine";
import { Aurora } from "@/components/ui/aurora";
import { BackgroundVideo } from "@/components/ui/background-video";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// Variable Inter — one file covers every weight the design uses.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument-serif",
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
  // Matches --ground in each theme so the mobile browser chrome tracks it.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f7" },
    { media: "(prefers-color-scheme: dark)", color: "#06080f" },
  ],
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
      className={`${inter.variable} ${instrumentSerif.variable} no-js`}
      // next-themes writes the theme class here before paint.
      suppressHydrationWarning
    >
      <head>
        {/* Drop `no-js` before first paint so reveal elements may start
            hidden. Without it, a visitor with JS disabled sees nothing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <ThemeProvider>
          {/* Ambient film, then the colour field over it. Both fixed and
              behind every page, so the backdrop is continuous across routes. */}
          <BackgroundVideo />
          <Aurora />

          <SmoothScroll>
            <ScrollProgress />
            <RevealEngine />
            <AppearEngine />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
