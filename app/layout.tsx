import type { ReactNode } from "react";
import type { Metadata } from "next";

import { weddingContent } from "@/lib/wedding-content";

import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
