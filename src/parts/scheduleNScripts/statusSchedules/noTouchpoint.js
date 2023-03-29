import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles.module.scss'

const NoTouchpoint = ({ hidden }) => {
  const c = `
  ${styles.touchpoint}
  ${styles.empty}
  ${hidden ? styles.hidden : ''}
  rounded
  p-2
  overflow-hidden
  m-0
  justify-content-center
  align-items-center
  `

  return (
    <div className={c}>
      <p className='m-0 text-center fw-bold'>
        No touchpoints have been configured
      </p>
    </div>
  )
}

NoTouchpoint.propTypes = {
  hidden: PropTypes.bool
}

export default NoTouchpoint
