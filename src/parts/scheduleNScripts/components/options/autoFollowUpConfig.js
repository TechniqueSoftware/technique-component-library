import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GLOBAL_SELECTOR } from '@redux/global'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { CheckBox, Input, TimePicker } from '@components/atoms'
import { SELECTORS } from '@parts/scheduleNScripts/redux'
import { SCRIPT_CONTACT_TYPES } from './constants'

const AutoFollowUpConfig = ({ autoOptions, setAutoOptions, isValidMinute }) => {
  const { data } = useSelector(SELECTORS.TOUCHPOINT_CRUD)
  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const { primaryAction, secondaryAction, dayNum, followUpMinutes } = data
  const hasAutoFollowUp = ![primaryAction, secondaryAction].includes(undefined)
  const [optionMsg, setOptionMsg] = useState('')
  const isImmediate = dayNum === 0
  const { smsEnabled } = useSelector(GLOBAL_SELECTOR.CLUB)

  useEffect(() => {
    if (!smsEnabled && !hasAutoFollowUp) {
      setAutoOptions({
        ...autoOptions,
        contact: SCRIPT_CONTACT_TYPES.EMAIL,
        fallback: SCRIPT_CONTACT_TYPES.NONE,
        disabledFallback: SCRIPT_CONTACT_TYPES.EMAIL
      })
    } else if (smsEnabled && !hasAutoFollowUp) {
      setAutoOptions({
        ...autoOptions,
        contact: SCRIPT_CONTACT_TYPES.SMS,
        fallback: SCRIPT_CONTACT_TYPES.NONE,
        disabledFallback: SCRIPT_CONTACT_TYPES.SMS
      })
    } else {
      setAutoOptions({
        ...autoOptions,
        contact: primaryAction,
        fallback: secondaryAction,
        disabledFallback: primaryAction,
        minute: followUpMinutes?.toString()
      })
    }
  }, [smsEnabled, hasAutoFollowUp])

  useEffect(() => {
    if (
      autoOptions.contact === SCRIPT_CONTACT_TYPES.SMS
      && autoOptions.fallback !== SCRIPT_CONTACT_TYPES.NONE
    ) {
      setOptionMsg('mobile phone or email are')
    } else if (
      autoOptions.contact === SCRIPT_CONTACT_TYPES.SMS
      && autoOptions.fallback === SCRIPT_CONTACT_TYPES.NONE
    ) {
      setOptionMsg('mobile phone is')
    } else if (
      autoOptions.contact === SCRIPT_CONTACT_TYPES.EMAIL
      && autoOptions.fallback === SCRIPT_CONTACT_TYPES.NONE
    ) {
      setOptionMsg('email is')
    }
  }, [autoOptions])

  const contactOptions = [
    { name: 'SMS', value: SCRIPT_CONTACT_TYPES.SMS, disabled: !smsEnabled },
    { name: 'Email', value: SCRIPT_CONTACT_TYPES.EMAIL }
  ]

  const fallbackOptions = [
    {
      name: 'SMS',
      value: SCRIPT_CONTACT_TYPES.SMS,
      disabled: autoOptions.disabledFallback === SCRIPT_CONTACT_TYPES.SMS || !smsEnabled
    },
    {
      name: 'Email',
      value: SCRIPT_CONTACT_TYPES.EMAIL,
      disabled: autoOptions.disabledFallback === SCRIPT_CONTACT_TYPES.EMAIL
    },
    { name: 'None (Convert to manual)', value: SCRIPT_CONTACT_TYPES.NONE }
  ]

  const handleContactOption = value => {
    const newFallback = value === SCRIPT_CONTACT_TYPES.SMS ? SCRIPT_CONTACT_TYPES.EMAIL : SCRIPT_CONTACT_TYPES.SMS
    setAutoOptions({
      ...autoOptions,
      contact: value,
      fallback: newFallback,
      disabledFallback: value
    })
  }

  const handleFallbackOption = value => {
    setAutoOptions({ ...autoOptions, fallback: value })
  }

  const handleTimePicker = (hour, minute, meridiem) => {
    setAutoOptions({ ...autoOptions, timePicker: { hour, minute, meridiem } })
  }

  const handleChange = e => {
    setAutoOptions({ ...autoOptions, minute: e.value })
  }
  return (
    <div className='text-start'>
      <Card body className='shadow-sm mt-4'>
        <Card.Text>
          <span className='text-muted fs-6 fw-bolder mb-2'>Automatic Follow Up Settings</span>
        </Card.Text>
        <Card.Text>
          <span className='text-muted text-left fs-6 fw-bold'>Send follow-up at</span>
        </Card.Text>
        {isImmediate === false ? (
          <>
            <TimePicker
              disabled={!canEditScripts || !canEditSchedules}
              onChange={handleTimePicker}
              selectedValue={autoOptions.timePicker}
            />
            <span className='text-muted fs-6'>Recipient’s Local Time</span>
          </>
        ) : (
          <>
            <Input
              disabled={!canEditScripts || !canEditSchedules}
              min={0}
              max={10000}
              type='number'
              value={autoOptions.minute}
              onChange={handleChange}
            />
            <span className='text-muted fs-6 fw-bold d-block'>minutes after status changes</span>
            {!isValidMinute && (
              <span className='text-danger d-block'>value must be between 0 to 10000</span>
            )}
            <span className='mt-4 d-block'>
              Users who enter the follow-up contact outside of the follow-up contact hours will have
              their automatic follow-up scheduled for the soonest open time.
            </span>
          </>
        )}
        <br />
        <>
          <span className='text-muted fs-6 fw-bold mb-4 d-block'>Preferred contact method</span>
          <CheckBox
            disabled={!canEditScripts || !canEditSchedules}
            onChange={handleContactOption}
            options={contactOptions}
            name='contactMethod'
            type='radio'
            selectedValue={[autoOptions.contact]}
          />
        </>
        <br />
        <>
          <span className='text-muted fs-6 fw-bold mb-4 d-block'>Fall-back contact method</span>
          <CheckBox
            disabled={!canEditScripts || !canEditSchedules}
            onChange={handleFallbackOption}
            options={fallbackOptions}
            name='fallbackMethod'
            type='radio'
            selectedValue={[autoOptions.fallback]}
          />
        </>
        <Card.Text>
          If recipient’s {optionMsg} missing or invalid, the follow-up will be converted to manual.
        </Card.Text>
      </Card>
    </div>
  )
}

AutoFollowUpConfig.propTypes = {
  setAutoOptions: PropTypes.func,
  autoOptions: PropTypes.object,
  isValidMinute: PropTypes.bool
}

export default AutoFollowUpConfig
