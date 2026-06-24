import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
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
  title: "Orientt — Design studio for founders",
  description:
    "Orientt is a design studio built to help founders ship ideas at venture speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${pixel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
