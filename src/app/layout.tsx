import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import CursorGlowBackground from '../components/sections/CursorGlowBackground'
import GridBackground from '../components/sections/GridBackground'

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
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
    <html lang="en" className={inter.className}>
      <body className="bg-white text-foreground antialiased">
        <GridBackground />
        <CursorGlowBackground />
        {children}
      </body>
    </html>
  );
}
