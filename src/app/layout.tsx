import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import ThemeToggle from "@/components/ThemeToggle";
import MobileNav from "@/components/MobileNav";
import CursorTrail from "@/components/CursorTrail";
import { NotificationProvider } from "@/components/NotificationProvider";

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

export const metadata: Metadata = {
  title: "Aromal Sajeev | Founding Engineer & Full-Stack Developer",
  description: "Portfolio of Aromal Sajeev, a Founding Engineer and Full-Stack Developer specializing in AI-driven systems and scalable infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
