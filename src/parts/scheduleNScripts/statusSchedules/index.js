import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Stack from 'react-bootstrap/Stack'

import { BUTTON_VARIANT, COLORS } from '@global/constants'
import { Button } from '@components/atoms'

import Accordion from 'react-bootstrap/Accordion'
import { useDispatch, useSelector } from 'react-redux'
import { schedulePropTypes, segmentPropTypes } from '../propTypes'
import styles from '../styles.module.scss'
import { checkIfSegmentStatus } from '../utils'
import StatusRow from './statusRow'
import { ACTIONS, SELECTORS } from '../redux'

const SEGMENTS_EVENT_KEY = '1'

const StatusSchedules = ({ id, displayName, schedules, segments, hidden, type, handleScript }) => {
  const dispatch = useDispatch()
  const [showSegmentRows, setShowSegmentRows] = useState(false)
  const { followUpSegmentsAction } = useSelector(SELECTORS.INNER_PERMISSIONS)
  const isSegmentStatus = followUpSegmentsAction && checkIfSegmentStatus(type, id)

  const handleModalSegment = () => {
    dispatch(ACTIONS.SEGMENTS.GET({ followUpType: type, followUpStatus: id, rowName: displayName }))
  }

  return (
    <Stack direction='vertical'>
      <StatusRow
        displayName={displayName}
        handleScript={handleScript}
        hidden={hidden}
        id={id}
        schedules={schedules}
        type={type}
      >
        {isSegmentStatus ? (
          <>
            <Button
              label='Manage Segments'
              className='fs-7 px-0'
              variant={BUTTON_VARIANT.LINK}
              color={COLORS.PRIMARY}
              onClick={handleModalSegment}
            />
            {segments.length ? (
              <Button
                className='p-0'
                icon={!showSegmentRows ? 'BsPlusCircle' : 'BsDashCircle'}
                label={!showSegmentRows ? 'Show Segments' : 'Hide Segments'}
                variant={BUTTON_VARIANT.LINK}
                color={COLORS.PRIMARY}
                reverse
                onClick={() => setShowSegmentRows(!showSegmentRows)}
              />
            ) : null}
          </>
        ) : null}
      </StatusRow>

      {isSegmentStatus ? (
        <Accordion className={styles.segmentRow} activeKey={showSegmentRows ? SEGMENTS_EVENT_KEY : undefined} flush>
          <Accordion.Collapse eventKey={SEGMENTS_EVENT_KEY}>
            <>
              {segments.map(segment => (
                <StatusRow
                  displayName={segment.name}
                  handleScript={handleScript}
                  hidden={hidden}
                  id={id}
                  key={segment.name}
                  schedules={segment.followUpSchedules}
                  segmentId={segment.segmentId}
                  type={type}
                />
              ))}
            </>
          </Accordion.Collapse>
        </Accordion>
      ) : null}
    </Stack>
  )
}

StatusSchedules.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  displayName: PropTypes.string,
  hidden: PropTypes.string,
  segments: PropTypes.arrayOf(segmentPropTypes),
  schedules: PropTypes.arrayOf(schedulePropTypes),
  type: PropTypes.number,
  handleScript: PropTypes.func
}

StatusSchedules.defaultProps = {
  segments: [],
  schedules: []
}

export default StatusSchedules
