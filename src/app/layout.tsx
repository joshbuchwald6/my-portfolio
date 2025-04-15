import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SpotlightGridBackground from '../components/sections/SpotlightGridBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sara Beer | Public Relations Student",
  description: "Portfolio of Sara Beer, a Combined Degree Public Relations Student at the University of Florida.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground font-sans antialiased`}>
        <SpotlightGridBackground color="pink" />
        {children}
      </body>
    </html>
  )
}
