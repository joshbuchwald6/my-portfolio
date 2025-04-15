'use client'

import React from 'react'
import styles from './SpotlightGridBackground.module.css'

interface SpotlightGridBackgroundProps {
  color?: string
  className?: string
}

function SpotlightGridBackground({ color = 'pink', className = '' }: SpotlightGridBackgroundProps) {
  return (
    <div 
      className={`${styles.background} ${className}`} 
      style={{ '--spotlight-color': color } as React.CSSProperties} 
    />
  )
}

export default SpotlightGridBackground 