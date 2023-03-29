import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { CloseButton } from 'react-bootstrap'

import { useClickOutside } from '@utils/hooks'

const backdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 9999,
  background: 'rgba(0, 0, 0, 0.5)'
}

const Title = ({ children }) => <h5 className='modal-title'>{children}</h5>
Title.propTypes = { children: PropTypes.node }

const Header = ({ children, onHide }) => (
  <div className='modal-header'>
    {children}
    {onHide && <CloseButton variant='white' aria-label='hide' onClick={onHide} />}
  </div>
)
Header.propTypes = { children: PropTypes.node, onHide: PropTypes.func }

const Body = ({ children }) => <div className='modal-body'>{children}</div>
Body.propTypes = { children: PropTypes.node }

const Footer = ({ children }) => <div className='modal-footer'>{children}</div>
Footer.propTypes = { children: PropTypes.node }

const Modal = ({ show, onHide, children, className }) => {
  const ref = useRef()
  useClickOutside(ref, onHide)

  if (!show) return null
  const cn = `
    modal-dialog
    modal-xl
    modal-dialog-centered
    modal-dialog-scrollable 
    ${className}
  `
  return (
    ReactDOM.createPortal(
      <div role='dialog' className='pkg-library'>
        <div style={backdrop}>
          <div className={cn} ref={ref}>
            <div className='modal-content'>
              {children}
            </div>
          </div>
        </div>
      </div>, document.body
    )
  )
}

Modal.Title = Title
Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

Modal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

export default Modal
