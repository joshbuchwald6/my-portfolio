import React from 'react'
import PropTypes from 'prop-types'
import styles from './SpotlightGridBackground.module.styl'

function SpotlightGridBackground ({ color = 'pink', className = '' }) {
  return (
    <div className={`${styles.background} ${className}`} style={{ '--spotlight-color': color }} />
  )
}

SpotlightGridBackground.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
}

export default SpotlightGridBackground 