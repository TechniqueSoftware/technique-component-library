import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components/atoms'
import { BUTTON_VARIANT } from '@global/constants'
import { useClickOutside } from '@utils/hooks'

const VARIANTS = {
  DELETE: {
    title: 'Are you sure you want to delete this segment?',
    subtitle: 'Deleting a segment will erase any scripts associated with it'
  },
  RECALCULATION: {
    title: 'Attention! All users in this segment will be recalculated based on date they entered the status and placed in the status touchpoint that corresponds most closely to their created date.', //eslint-disable-line
    subtitle: 'Are you sure you would like to proceed with this change?'
  }
}

export default function ConfirmationWarning ({ onClose, onConfirmation, variant }) {
  const ref = useRef()
  useClickOutside(ref, onClose)

  return (
    <div
      className='d-flex flex-column align-items-center my-4 shadow rounded p-2 text-center'
      id={`${variant.toLowerCase()}-confirmation`}
      ref={ref}
    >
      <p>{VARIANTS[variant].title}</p>
      <p className='mt-2'>{VARIANTS[variant].subtitle}</p>
      <div className='d-flex flex-row mt-2'>
        <Button variant={BUTTON_VARIANT.OUTLINE} label='No' onClick={onClose} />
        <Button className='ms-2' label='Yes' onClick={onConfirmation} />
      </div>
    </div>
  )
}

ConfirmationWarning.propTypes = {
  onConfirmation: PropTypes.func,
  onClose: PropTypes.func,
  variant: PropTypes.string
}
