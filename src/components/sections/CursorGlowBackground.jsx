'use client'

import React, { useEffect, useRef } from 'react'
import styles from './CursorGlowBackground.module.css'

function CursorGlowBackground() {
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        glowRef.current.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <div ref={glowRef} className={styles.glow} />
}

export default CursorGlowBackground 