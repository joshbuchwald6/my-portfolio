import { Inter } from 'next/font/google'
import { ClientBody } from '@/components/layout/ClientBody'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Josh Buchwald',
  description: 'Josh Buchwald\'s Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  )
}
