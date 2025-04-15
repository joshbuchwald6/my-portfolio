'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import SpotlightGridBackground from '../components/sections/SpotlightGridBackground'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Sara Beer | Public Relations Student</title>
        <meta name="description" content="Portfolio of Sara Beer, a Combined Degree Public Relations Student at the University of Florida." />
      </head>
      <body className={`${inter.className} bg-background text-foreground font-sans antialiased`}>
        <SpotlightGridBackground color="pink" />
        {children}
      </body>
    </html>
  )
}
