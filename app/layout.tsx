import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BodyWrapper from "@/libs/BodyWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vape Alchemist",
  description: "Where bold flavors meet smooth clouds. Explore disposables, juices, pods, and accessories that turn every puff into pure magic.History in your pocket, flavor on your lips. The perfect blend of vintage class and smooth, modern hits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white max-w-[1600px] mx-auto antialiased`}
        >
         <BodyWrapper>
            {children}
         </BodyWrapper>
      </body>
    </html>
  );
}
