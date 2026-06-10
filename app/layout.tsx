import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StickerKita | Custom Sticker Printing Malaysia",
  description:
    "StickerKita provides mirrorcoat, gloss, waterproof, and transparent sticker printing for packaging, labels, small businesses, and custom designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}