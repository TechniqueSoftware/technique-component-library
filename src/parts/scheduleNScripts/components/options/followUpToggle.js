import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ToggleButton } from '@components/atoms'
import { useSelector } from 'react-redux'
import { SELECTORS } from '@parts/scheduleNScripts/redux'
import AutoFollowUpConfig from './autoFollowUpConfig'

const FollowUpToggle = ({
  autoOptions,
  setAutoOptions,
  isValidMinute,
  setFollowUpToggle,
  followUpToggle }) => {
  const { data } = useSelector(SELECTORS.TOUCHPOINT_CRUD)
  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const { primaryAction, secondaryAction } = data
  const hasAutoFollowUp = ![primaryAction, secondaryAction].includes(undefined)
  const toggleOptions = [
    { name: 'Manual', value: 'manual' },
    { name: 'Automatic', value: 'auto' }
  ]

  useEffect(() => {
    if (hasAutoFollowUp) {
      setFollowUpToggle('auto')
    }
  }, [hasAutoFollowUp])

  const handleChange = value => {
    setFollowUpToggle(value)
  }

  return (
    <div className='text-center'>
      <ToggleButton
        className='mt-3'
        disabled={!canEditScripts || !canEditSchedules}
        name='manual-auto'
        radios={toggleOptions}
        onChange={handleChange}
        selectedValue={followUpToggle}
      />
      {followUpToggle === 'auto' && (
        <AutoFollowUpConfig
          autoOptions={autoOptions}
          setAutoOptions={setAutoOptions}
          isValidMinute={isValidMinute}
        />
      )}
    </div>
  )
}

FollowUpToggle.propTypes = {
  setAutoOptions: PropTypes.func,
  autoOptions: PropTypes.object,
  isValidMinute: PropTypes.bool,
  followUpToggle: PropTypes.string,
  setFollowUpToggle: PropTypes.func
}

export default FollowUpToggle
