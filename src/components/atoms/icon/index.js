import React from 'react'
import PropTypes from 'prop-types'
import * as BsIcon from 'react-icons/bs'

import styles from './styles.module.scss'

const Icon = ({ name, className, onClick }) => {
  const theClasses = `
    d-flex
    justify-content-center
    align-items-center
    ${className || ''}
    ${onClick ? styles.action : ''}
  `

  const icon = React.createElement(BsIcon[name])
  if (!icon) return null

  return (
    <div
      className={theClasses}
      onClick={onClick}
      onKeyDown={onClick}
      role={onClick ? 'button' : 'img'}
      aria-label={name}
    >
      {icon}
    </div>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Icon.defaultProps = {
  name: 'BsWind'
}

export default Icon
