import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECTORS } from '@parts/scheduleNScripts/redux'
import Script from './script'
import FollowUpToggle from './followUpToggle'
import { objectToFollowUpTime, followUpTimeToObject } from './utils'

export const defaultTimePicker = { hour: 12, minute: '00', meridiem: 'PM' }
const getInitialTimePicker = followUpTime => {
  if (!followUpTime) return defaultTimePicker
  return followUpTimeToObject(followUpTime)
}

export default function ScriptsModal () {
  const { data } = useSelector(SELECTORS.TOUCHPOINT_CRUD)
  const [autoOptions, setAutoOptions] = useState({
    timePicker: getInitialTimePicker(data.followUpTime),
    minute: ''
  })
  const [followUpToggle, setFollowUpToggle] = useState('manual')
  const [isValidMinute, setValidMinute] = useState(true)
  const { timePicker } = autoOptions
  const followUpTime = objectToFollowUpTime(timePicker.hour, timePicker.minute, timePicker.meridiem)

  const dataSchedule = {
    followUpTime,
    secondaryAction: autoOptions.fallback,
    primaryAction: autoOptions.contact,
    followUpMinutes: autoOptions.minute
  }

  const { automaticFollowUpAction } = useSelector(SELECTORS.INNER_PERMISSIONS)

  const scriptProps = {
    dataSchedule,
    followUpToggle,
    setValidMinute
  }

  return (
    <Row>
      {automaticFollowUpAction ? (
        <Col xs={3}>
          <FollowUpToggle
            autoOptions={autoOptions}
            setAutoOptions={setAutoOptions}
            setFollowUpToggle={setFollowUpToggle}
            followUpToggle={followUpToggle}
            isValidMinute={isValidMinute}
          />
        </Col>
      ) : null}
      <Col md={!automaticFollowUpAction ? 12 : undefined}>
        <Script {...scriptProps} />
      </Col>
    </Row>
  )
}
