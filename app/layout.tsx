import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  openGraph: {
    title: "Riya Closet | Your All Day Fashion Hub",
    description:
      "Modern silhouettes and timeless Indian craft for every version of your day.",
    url: "https://prakash116.github.io/riya/",
    siteName: "Riya Closet",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://prakash116.github.io/riya/images/hero.jpg",
        width: 1600,
        height: 900,
        alt: "Riya Closet fashion collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riya Closet | Your All Day Fashion Hub",
    description:
      "Modern silhouettes and timeless Indian craft for every version of your day.",
    images: ["https://prakash116.github.io/riya/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Riya Closet",
    "Indian fashion",
    "suit sets",
    "co-ords",
    "occasion wear",
  ],
  authors: [{ name: "Riya Closet" }],
  creator: "Riya Closet",
  publisher: "Riya Closet",
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
