import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'
import { Button } from '@components/atoms'

const backdrop = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 9999,
  background: 'rgba(0, 0, 0, 0.5)'
}

const PopupAlert = ({ msg, handleClose }) => (
  ReactDOM.createPortal(
    <div role='dialog' className='pkg-library'>
      <div style={backdrop}>
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <Alert className='w-100 m-auto' variant='secondary'>
              <Alert.Heading>clubOS says:</Alert.Heading>
              <p className='fs-5'>
                {msg}
              </p>
              <hr />
              <Button label='OK' onClick={handleClose} />
            </Alert>
          </div>
        </div>
      </div>
    </div>, document.body
  )
)

PopupAlert.propTypes = {
  msg: PropTypes.string,
  handleClose: PropTypes.func
}

export default PopupAlert
