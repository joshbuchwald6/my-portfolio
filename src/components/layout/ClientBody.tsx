'use client'

import SpotlightGridBackground from '../sections/SpotlightGridBackground'

interface ClientBodyProps {
  children: React.ReactNode
  className?: string
}

export function ClientBody({ children, className }: ClientBodyProps) {
  return (
    <>
      <SpotlightGridBackground color="pink" />
      {children}
    </>
  )
} 