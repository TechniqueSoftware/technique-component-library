import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Toast from 'react-bootstrap/Toast'

import { COLORS } from '@global/constants'
import MyProptypes from '@global/propTypes'

const Snackbar = ({ color, msg, handleClose, time }) => {
  useEffect(() => {
    setTimeout(() => {
      handleClose()
    }, time)
  }, [])

  const cn = `
    bg-${color}
    text-white
    d-flex
    align-items-center
    justify-content-between
    w-100
  `

  return (
    <Toast className='border-0 fixed-top w-100' onClose={handleClose}>
      <Toast.Header className={cn}>
        <p className='fs-5'>{msg}</p>
      </Toast.Header>
    </Toast>
  )
}

Snackbar.propTypes = {
  msg: PropTypes.string,
  color: MyProptypes.colors,
  handleClose: PropTypes.func,
  time: PropTypes.number
}

Snackbar.defaultProps = {
  color: COLORS.PRIMARY,
  time: 2500
}

export default Snackbar
