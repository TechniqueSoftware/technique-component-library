import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BUTTON_VARIANT, COLORS } from '@global/constants'
import { useDispatch, useSelector } from 'react-redux'
import { Stack } from 'react-bootstrap'
import { Button } from '@components/atoms'
import styles from '../styles.module.scss'
import { schedulePropTypes } from '../propTypes'
import { ACTIONS, SELECTORS, TP_OPTIONS } from '../redux'
import NoTouchpoint from './noTouchpoint'
import Touchpoint from './touchpoint'

const ONE_TP_STATUSES = [{ type: 1, id: '2' }, { type: 2, id: '2' }]

export default function StatusRow ({ children, id, displayName, schedules, hidden, type, handleScript, segmentId }) {
  const dispatch = useDispatch()
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const MAX_TPS = ONE_TP_STATUSES.find(s => s.type === type && s.id === id) ? 1 : 10
  const [tpDays, setTpDays] = useState([])

  useEffect(() => {
    setTpDays(schedules.map(({ dayNum }) => `${dayNum}`))
  }, [schedules])

  const handleNew = () => {
    dispatch(
      ACTIONS.TOUCHPOINT.OPEN({
        action: TP_OPTIONS.NEW,
        data: { id, displayName, tpDays, type, segmentId }
      })
    )
  }

  const handleOptions = t => {
    dispatch(
      ACTIONS.TOUCHPOINT.OPEN({
        action: TP_OPTIONS.MENU,
        data: { ...t, tpDays }
      })
    )
  }

  const renderTouchpoint = (tp, i) => {
    if (i > 9) return null

    const { clubId, followUpType, followUpStatus, followUpSeqNum } = tp
    const replay = i >= 9

    return (
      <Touchpoint
        key={`${clubId}-${followUpType}-${followUpStatus}-${followUpSeqNum}`}
        replay={replay}
        id='id'
        touchpoint={{ ...tp, rowName: displayName }}
        handleScript={handleScript}
        handleOptions={handleOptions}
      />
    )
  }

  const renderHiddentext = () => (
    <Stack direction='horizontal' gap={3} className={styles.statusRow}>
      <p className='fw-bold text-muted h5'>Hidden from dashboard and search filters</p>
      <NoTouchpoint hidden />
    </Stack>
  )

  const renderShedule = schedules => {
    if (!schedules.length) return <NoTouchpoint />
    return schedules.map((sch, i) => renderTouchpoint(sch, i))
  }

  return (
    <Stack direction='horizontal' key={displayName} gap={3} className={styles.statusRow}>
      <div className={styles.titleContainer}>
        <p className='fw-bold text-muted h5'>{displayName}</p>
        {children}
      </div>
      {hidden === 'true' ? renderHiddentext() : renderShedule(schedules)}

      {hidden === 'false' && canEditSchedules && schedules.length < MAX_TPS && (
        <Button
          icon='BsPlusCircle'
          label='New touchpoint'
          variant={BUTTON_VARIANT.GHOST}
          color={COLORS.DARK}
          onClick={handleNew}
        />
      )}

      {MAX_TPS === 1 ? (
        <p className='text-muted'>Note: Follow-up in this status occurs BEFORE the scheduled event.</p>
      ) : null}
    </Stack>
  )
}

StatusRow.propTypes = {
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayName: PropTypes.string,
  hidden: PropTypes.string,
  schedules: PropTypes.arrayOf(schedulePropTypes),
  type: PropTypes.number,
  handleScript: PropTypes.func,
  segmentId: PropTypes.number
}

StatusRow.defaultProps = {
  children: null,
  schedules: []
}
