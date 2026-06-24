import type { Metadata } from "next";
import { Geist, Handjet, Inter } from "next/font/google";
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

// Dot-matrix display face, used to approximate Figma's "Geist Pixel"
// for accent words like "ship" and the "ShowReel.mp4" labels.
const pixel = Handjet({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500"],
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
