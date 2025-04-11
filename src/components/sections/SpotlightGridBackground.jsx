import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './SpotlightGridBackground.module.css'

function SpotlightGridBackground ({ color = 'pink', className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={`${styles.background} ${className}`} style={{ '--spotlight-color': color }}>
      <div 
        className={styles.spotlight}
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`
        }}
      />
    </div>
  )
}

SpotlightGridBackground.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
}

export default SpotlightGridBackground 