import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Tooltip } from '@components'
import { Icon } from '@components/atoms'
import { useSelector } from 'react-redux'
import { schedulePropTypes } from '../propTypes'
import styles from '../styles.module.scss'
import { TP_ACTION_TYPES } from '../constants'
import { SELECTORS } from '../redux'

const Touchpoint = ({
  replay,
  touchpoint,
  handleScript,
  handleOptions
}) => {
  const [immediate, setImmediate] = useState(false)
  const [call, setCall] = useState(false)
  const [email, setEmail] = useState(false)
  const [sms, setSms] = useState(false)
  const ref = useRef(null)

  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const { automaticFollowUpAction } = useSelector(SELECTORS.INNER_PERMISSIONS)

  useEffect(() => {
    const { scripts } = touchpoint
    setImmediate(touchpoint.dayNum === 0)
    if (Array.isArray(scripts)) {
      setCall(scripts.some(s => s.actionType === TP_ACTION_TYPES.CALL))
      setEmail(scripts.some(s => s.actionType === TP_ACTION_TYPES.EMAIL))
      setSms(scripts.some(s => s.actionType === TP_ACTION_TYPES.TEXT))
    } else {
      setCall(false)
      setEmail(false)
      setSms(false)
    }
  }, [touchpoint])

  const c = `
    ${styles.touchpoint}
    ${styles.filled}
    rounded
    py-2
    px-3
    m-0
  `

  const displayName = immediate ? 'Immediate' : `Day ${touchpoint.dayNum}`
  return (
    <div ref={ref} className={c}>
      <div className={`${styles.row}${immediate ? ' justify-content-between' : ''}`}>
        {replay && (
          <Tooltip
            id={`tooltip-${touchpoint.followUpStatus}${touchpoint.followUpType}${touchpoint.followUpSeqNum}`}
            message='When a 10th touchpoint is configured, it will repeat indefinitely'
            toolref={ref}
          >
            <Icon
              name='BsArrowClockwise'
              className={`text-muted fs-5 ${replay ? '' : styles.hidden}`}
              data-bs-toggle='popover'
              data-bs-trigger='hover focus'
              data-bs-content='Disabled popover'
            />
          </Tooltip>
        )}

        <p className='m-0 text-dark text-center fw-bold align-middle'>
          {displayName}
        </p>

        <Icon
          name='BsThreeDotsVertical'
          className={`text-muted fs-5 ${(!canEditSchedules && !canEditScripts) ? styles.hidden : ''}`}
          onClick={() => handleOptions({ ...touchpoint, displayName })}
        />
      </div>
      <div className={`gap-2 justify-content-center ${styles.row}`}>
        {email && (
          <Icon
            name='BsEnvelope'
            className='text-muted fs-5'
            onClick={() => handleScript(touchpoint, TP_ACTION_TYPES.EMAIL)}
          />
        )}

        {sms && (
          <Icon
            name='BsChatDots'
            className='text-muted fs-5'
            onClick={() => handleScript(touchpoint, TP_ACTION_TYPES.TEXT)}
          />
        )}

        {call && (
          <Icon
            name='BsTelephone'
            className='text-muted fs-5'
            onClick={() => handleScript(touchpoint, TP_ACTION_TYPES.CALL)}
          />
        )}

        {!email && !sms && !call && (
          <Tooltip
            id={`NoScript-${touchpoint.followUpStatus}${touchpoint.followUpType}${touchpoint.followUpSeqNum}`}
            toolref={ref}
            message='No scripts have been added for this touchpoint'
          >
            <Icon
              name='BsExclamationTriangleFill'
              className='text-muted fs-5'
              onClick={() => handleScript(touchpoint, TP_ACTION_TYPES.CALL)}
            />
          </Tooltip>
        )}
        {touchpoint.followUpTime && automaticFollowUpAction && (
          <Icon
            name='BsClock'
            className='text-muted fs-5'
          />
        )}
      </div>
    </div>
  )
}

Touchpoint.propTypes = {
  replay: PropTypes.bool,
  touchpoint: schedulePropTypes,
  handleScript: PropTypes.func,
  handleOptions: PropTypes.func
}

Touchpoint.defaultProps = {
  touchpoint: {}
}

export default Touchpoint
