import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

import styles from './styles.module.scss'

const MyTooltip = ({ id, message, toolref, children }) => {
  const renderTooltip = props => (
    <Tooltip id={id} className={styles.tooltip} {...props}>
      {message}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement='left'
      container={toolref}
      trigger={['hover', 'focus']}
      overlay={renderTooltip}
    >
      <div>{children}</div>
    </OverlayTrigger>
  )
}

MyTooltip.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  toolref: PropTypes.any
}

export default MyTooltip
