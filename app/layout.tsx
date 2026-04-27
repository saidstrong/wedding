import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { weddingContent } from "@/lib/wedding-content";

import "./globals.css";

const antquabi = localFont({
  src: "./fonts/antquabi-kz.ttf",
  variable: "--font-antquabi",
  display: "swap",
});

const kzGoodVibes = localFont({
  src: "./fonts/kz-good-vibes-2.ttf",
  variable: "--font-kz-good-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingContent.metadata.title,
  description: weddingContent.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${antquabi.variable} ${kzGoodVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}
