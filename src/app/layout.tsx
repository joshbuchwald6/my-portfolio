import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import CursorGlowBackground from '../components/sections/CursorGlowBackground'
import GridBackground from '../components/sections/GridBackground'
import { Button } from '../components/ui/button'

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
        <div className="mt-32 md:mt-40 lg:mt-52 text-center">
          <h1 className="text-5xl font-bold">Sara Beer</h1>
          <p className="mt-4 text-lg text-gray-600">
            Combined Degree Public Relations Student at the University of Florida
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button>Get In Touch</Button>
            <Button variant="ghost">View Resume</Button>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
