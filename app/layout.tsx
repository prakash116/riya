import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  keywords: [
    "Riya Closet",
    "Indian fashion",
    "suit sets",
    "co-ords",
    "occasion wear",
  ],
  title: "Riya Closet — Your All Day Fashion Hub",
  description:
    "A refined landing page concept for Riya Closet, bringing together modern silhouettes and timeless Indian craft.",
};

export const viewport: Viewport = {
  themeColor: "#3f0b24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
