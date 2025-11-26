import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background3D from "@/components/Background3D";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
        className={`${inter.variable} antialiased`}
      >
        <Background3D />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
