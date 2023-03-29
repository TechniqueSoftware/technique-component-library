import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CloseButton from 'react-bootstrap/CloseButton'

import { useClickOutside } from '@utils/hooks'

import styles from './styles.module.scss'

const Offcanvas = props => {
  const {
    show,
    handleClose,
    placement,
    title,
    close,
    children,
    exludeCloseClass,
    canvasClass
  } = props

  const ref = useRef()
  useClickOutside(ref, handleClose, exludeCloseClass)

  const offClassNames = `
    offcanvas
    offcanvas-${placement}
    ${styles.offcanvas}
    ${canvasClass}
  `

  if (!show) return null

  return (
    ReactDOM.createPortal(
      <div role='dialog' className='pkg-library'>
        <div className={styles.backdrop}>
          <div className={offClassNames} tabIndex='-1' ref={ref}>
            <div className={`offcanvas-header ${title ? styles.header : 'pb-0'}`}>
              <h5>{title}</h5>
              {close && <CloseButton aria-label='hide' onClick={handleClose} />}
            </div>

            <div className={`offcanvas-body ${!title ? 'pt-0' : ''}`}>
              {children}
            </div>
          </div>
        </div>
      </div>, document.body
    )
  )
}

Offcanvas.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  placement: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
  title: PropTypes.string,
  close: PropTypes.bool,
  children: PropTypes.node,
  exludeCloseClass: PropTypes.array,
  canvasClass: PropTypes.string
}

Offcanvas.defaultProps = {
  placement: 'end',
  close: true
}

export default Offcanvas
