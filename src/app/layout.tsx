import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-masked-man.vercel.app";

const description =
  "Enter the world of The Masked Man — an interactive developer portfolio built around code, struggle, ambition and the dream of creating NEXUS.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Masked Man — Full-Stack Developer",
  description,
  keywords: [
    "The Masked Man",
    "full-stack developer",
    "portfolio",
    "NEXUS",
    "KisanSetu",
    "React",
    "Node.js",
    "MongoDB",
    "AI",
  ],
  authors: [{ name: "The Masked Man" }],
  openGraph: {
    title: "The Masked Man — Full-Stack Developer",
    description,
    url: siteUrl,
    siteName: "THE MASKED MAN",
    type: "website",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "The Masked Man — a faceless developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Masked Man — Full-Stack Developer",
    description,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#040507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-void font-sans text-zinc-300 antialiased">
        {children}
      </body>
    </html>
  );
}
