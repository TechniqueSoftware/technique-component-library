import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone'

import { Accordion, Form, Card } from 'react-bootstrap'

import { Select, Input, Dropdown } from '@components/atoms'
import { checkAppointmentField } from '@utils/validation'

import { GLOBAL_SELECTOR } from '@redux/global'
import { modifyMomentZoneNameMethodToUseZoneNameMap } from '../../../utils/time'

import { ACTIONS, SELECTORS } from '../redux'

import AccordionButton from './AccordionButton'
import { EVENT_ICONS } from '../constants'

const APPT_EVENT_KEY = '1'

const parseEmployees = employees => employees.map(({ availability, firstName, lastName, userId }) => ({
  name: `${firstName} ${lastName}`,
  value: userId,
  availability
}))

const parseAvailability = (availability, tz) => availability.map(({ startTime, bookedEvents }) => {
  if (!availability?.length) return []
  const data = bookedEvents.map(ev => {
    const peopleData = ev.bookedEventTypeId === 4 ? `${ev.bookedEventAttendeeCount} people - ` : ''
    return {
      icon: EVENT_ICONS[ev.bookedEventTypeId],
      text: `${peopleData}${ev.bookedEventShortLabel}`
    }
  })
  return { name: moment(startTime).tz(tz).format('hh:mm A'), data, value: startTime }
})

const AppointmentAccordion = () => {
  const dispatch = useDispatch()
  const user = useSelector(GLOBAL_SELECTOR.USER)
  const employees = useSelector(SELECTORS.EMPLOYEES)
  const selectedLocation = useSelector(SELECTORS.SELECTED_LOCATION)
  const appointment = useSelector(SELECTORS.APPOINTMENT)
  const appointmentEnabled = useSelector(SELECTORS.APPOINTMENT_ENABLED)
  const [availability, setAvailability] = useState([])
  modifyMomentZoneNameMethodToUseZoneNameMap()

  const handleSelect = selected => {
    const { name, value } = selected
    const { error, validated } = checkAppointmentField(selected, appointment)
    dispatch(
      ACTIONS.DATA.SET({
        name,
        data: { value, error, validated }
      })
    )
  }

  useEffect(() => {
    if (!selectedLocation.value.value) return
    dispatch(ACTIONS.DATA.REQUEST_EMPLOYEES_DATA())
  }, [selectedLocation.value, appointment.date.value])

  useEffect(() => {
    if (!employees?.length) return handleSelect({ name: 'contact', value: { name: '', value: '', availability: [] } })
    const selectedEmployee = employees.find(({ userId }) => userId === appointment.contact.value.value)
    const loggedInUser = employees.find(({ userId }) => userId === user.userId)
    const employee = selectedEmployee || loggedInUser || employees[0]
    const value = {
      value: employee.userId,
      name: `${employee.firstName} ${employee.lastName}`,
      availability: employee.availability
    }
    handleSelect({ name: 'contact', value })
  }, [JSON.stringify(employees)])

  useEffect(() => {
    const { availability } = appointment.contact.value
    handleSelect({
      name: 'time',
      value: availability.length ? { value: availability[0].startTime } : { name: '', value: '' }
    })
  }, [appointment.contact.value])

  useEffect(() => {
    const newAvailability = parseAvailability(appointment.contact.value.availability, selectedLocation?.value?.timeZone)
    setAvailability(newAvailability)
  }, [appointment.contact.value.availability, appointment.contact.value, selectedLocation?.value?.timeZone])

  return employees && selectedLocation?.value?.timeZone ? (
    <Accordion activeKey={appointmentEnabled ? APPT_EVENT_KEY : undefined} flush className='mt-5'>
      <Card className='border-0'>
        <Card.Header className='border-0 bg-white p-0'>
          <AccordionButton eventKey={APPT_EVENT_KEY} />
        </Card.Header>
        <Accordion.Collapse eventKey={APPT_EVENT_KEY}>
          <Card.Body className='py-3 px-2'>
            <Form.Group>
              <div className='mb-3'>
                <Select
                  name='contact'
                  label={appointment.contact.label}
                  options={parseEmployees(employees)}
                  selected={appointment.contact.value}
                  initialValue={user.userId}
                  onSelect={handleSelect}
                  required={appointmentEnabled}
                  error={appointment.contact.error}
                  validated={appointment.contact.validated}
                />
              </div>
              <Input
                max='9999-12-31'
                name='date'
                type='date'
                label={appointment.date.label}
                value={appointment.date.value}
                min={moment().format('YYYY-MM-DD')}
                onChange={handleSelect}
                required={appointmentEnabled}
                error={appointment.date.error}
                validated={appointment.date.validated}
              />
              {availability.length ? (
                <div className='d-flex flex-row align-items-center'>
                  <Dropdown
                    name='time'
                    disclaimer={moment(appointment.date.value).tz(selectedLocation?.value?.timeZone).format('zz')}
                    label={appointment.time.label}
                    onSelect={handleSelect}
                    selected={appointment.time.value}
                    options={availability}
                  />
                </div>
              ) : (
                <span>No availability</span>
              )}
            </Form.Group>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  ) : null
}

export default AppointmentAccordion
