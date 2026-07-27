import type { Metadata } from "next";
import { Geist, Inter, Dela_Gothic_One, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import JsonLd from "@/components/JsonLd";
import { organizationGraph } from "@/lib/structured-data";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  LOCALE,
  SOCIAL,
} from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Display face for the hero headline
const dela = Dela_Gothic_One({
  weight: "400",
  variable: "--font-dela",
  subsets: ["latin"],
});

// Soft serif for the "Design" accent (Recoleta stand-in)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

// Used by small UI chips/badges per the Figma design system
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Figma's "Geist Pixel: Triangle" — accent words like "ship" and ShowReel labels
const pixel = localFont({
  src: "./fonts/GeistPixel-Triangle.woff2",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // opengraph-image.tsx supplies the image automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: SOCIAL.xHandle,
    creator: SOCIAL.xHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Add your Search Console token via NEXT_PUBLIC_GOOGLE_VERIFICATION to verify.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${geist.variable} ${pixel.variable} ${inter.variable} ${dela.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <JsonLd data={organizationGraph()} />
        {children}
        <Toaster
          theme="light"
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "gap-3",
              content: "flex-1",
            },
          }}
        />
      </body>
    </html>
  );
}
