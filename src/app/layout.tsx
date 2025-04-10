import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS Variable for Inter
});

// Assume Satoshi font files are in /public/fonts
const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi", // CSS Variable for Satoshi
  display: "swap", // Ensure text is visible while font loads
});

export const metadata: Metadata = {
  title: "Sara Beer | Public Relations Student",
  description: "Portfolio of Sara Beer, a Combined Degree Public Relations Student at the University of Florida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
