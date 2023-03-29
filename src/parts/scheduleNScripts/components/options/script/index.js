import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from '@components'
import { Icon } from '@components/atoms'
import { GLOBAL_SELECTOR, GLOBAL_ACTIONS } from '@redux/global'
import { useDispatch, useSelector } from 'react-redux'
import { SCRIPT_TABNAME } from '@parts/scheduleNScripts/constants'
import { SELECTORS } from '@parts/scheduleNScripts/redux'
import ScriptBody from './scriptBody'

const theClasses = `
d-flex
justify-content-center
align-items-center
j
`

const Script = ({ dataSchedule, followUpToggle, setValidMinute }) => {
  const dispatch = useDispatch()
  const { data, action } = useSelector(SELECTORS.TOUCHPOINT_CRUD)
  const locations = useSelector(GLOBAL_SELECTOR.LOCATIONS)
  const { smsEnabled } = useSelector(GLOBAL_SELECTOR.CLUB)
  const [actionType, setActionType] = useState(action)
  const [scriptsToSave, setScriptsToSave] = useState(data.scripts || [])

  useEffect(() => {
    if (locations.length) dispatch(GLOBAL_ACTIONS.DYNAMIC_TAGS.GET(locations[0].locationId))
  }, [])
  const dynamicTags = [
    { name: 'Default', options: [{ name: 'Select to Add', value: '' }] },
    ...useSelector(GLOBAL_SELECTOR.DYNAMIC_TAGS)
  ]
  const defaulttab = () => {
    const found = SCRIPT_TABNAME.find(tabs => parseInt(tabs.id, 10) === actionType)
    return found.id - 1
  }

  const handleTabSelect = key => {
    setActionType(parseInt(key, 10) + 1)
  }

  const getContent = id => (
    <ScriptBody
      followUpToggle={followUpToggle}
      setValidMinute={setValidMinute}
      scriptsToSave={scriptsToSave}
      setScriptsToSave={setScriptsToSave}
      dataSchedule={dataSchedule}
      actionType={actionType}
      dynamicTags={dynamicTags}
      tabId={id}
    />
  )

  const getTabs = () => SCRIPT_TABNAME.map(({ id, name, className }) => ({
    id,
    title: (
      <div className={theClasses}>
        <Icon
          name={className}
          className={`${defaulttab() + 1 === id ? 'text-muted' : ''} fs-5`}
        />
        <span style={{ marginLeft: '8px' }}> {name}</span>
      </div>
    ),
    disabled: id === '3' && !smsEnabled && followUpToggle === 'manual',
    content: getContent(parseInt(id, 10))
  }))

  return (
    <Tabs
      tabUnderline
      id='sns-script-modal-tabs'
      tabs={getTabs()}
      defaultActive={defaulttab()}
      onTabSelect={handleTabSelect}
    />
  )
}

Script.propTypes = {
  dataSchedule: PropTypes.object,
  followUpToggle: PropTypes.string,
  setValidMinute: PropTypes.func
}

export default Script
