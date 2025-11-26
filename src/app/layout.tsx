import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import CursorTrail from "@/components/CursorTrail";
import { NotificationProvider } from "@/components/NotificationProvider";
import { PersonJsonLd, WebsiteJsonLd, ProfilePageJsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amalusajeev.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amalu Sajeev | Aromal Sajeev - Founding Engineer & Full-Stack Developer",
    template: "%s | Amalu Sajeev",
  },
  description: "Portfolio of Amalu Sajeev (Aromal Sajeev), a Founding Engineer and Full-Stack Developer from Hyderabad, India. Specializing in AI-driven systems, scalable infrastructure, React, Node.js, and cloud technologies.",
  keywords: [
    "Amalu Sajeev",
    "Aromal Sajeev",
    "Amalu",
    "Full Stack Developer",
    "Founding Engineer",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Developer",
    "Hyderabad",
    "India",
    "AI Systems",
    "Cloud Infrastructure",
    "Portfolio",
  ],
  authors: [{ name: "Amalu Sajeev", url: siteUrl }],
  creator: "Amalu Sajeev",
  publisher: "Amalu Sajeev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Amalu Sajeev Portfolio",
    title: "Amalu Sajeev | Aromal Sajeev - Founding Engineer & Full-Stack Developer",
    description: "Portfolio of Amalu Sajeev (Aromal Sajeev), a Founding Engineer and Full-Stack Developer specializing in AI-driven systems and scalable infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amalu Sajeev - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amalu Sajeev | Aromal Sajeev - Founding Engineer & Full-Stack Developer",
    description: "Portfolio of Amalu Sajeev (Aromal Sajeev), a Founding Engineer and Full-Stack Developer specializing in AI-driven systems.",
    images: ["/og-image.png"],
    creator: "@amalusajeev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
        <ProfilePageJsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NotificationProvider>
          <Background3D />
          <MobileNav />
          <ThemeToggle />
          <CursorTrail />
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
