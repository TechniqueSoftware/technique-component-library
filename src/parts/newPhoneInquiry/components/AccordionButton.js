import React from 'react'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { ToggleCheck } from '@components/atoms'

import { ACTIONS, SELECTORS } from '../redux'

const AccordionButton = ({ eventKey }) => {
  const appointmentEnabled = useSelector(SELECTORS.APPOINTMENT_ENABLED)
  const dispatch = useDispatch()
  const onChange = useAccordionButton(eventKey, () => dispatch(ACTIONS.DATA.TOGGLE_APPOINTMENT(!appointmentEnabled)))

  return (
    <ToggleCheck
      name='scheduleAppointmentToggle'
      title='Schedule Appointment'
      onChange={onChange}
      checked={appointmentEnabled}
    />
  )
}

AccordionButton.propTypes = {
  eventKey: PropTypes.string.isRequired
}

export default AccordionButton
