import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Offcanvas, Tabs } from '@components'
import { ACTIONS, SELECTORS } from '@parts/scheduleNScripts/redux'
import { SEGMENT_TABNAME } from '@parts/scheduleNScripts/constants'
import { GLOBAL_SELECTOR } from '@redux/global'
import styled from './styles.module.scss'
import CopySegments from './copySegments'
import ManageSegments from './manageSegments'
import { checkPermission } from './utils'

const TABS_CONTENT = [ManageSegments, CopySegments]

export default function Segments () {
  const dispatch = useDispatch()
  const { isOpen, title } = useSelector(SELECTORS.SEGMENT_MODAL_DATA)
  const [currentTab, setCurrentTab] = useState(SEGMENT_TABNAME[0].id)
  const currentPermissions = useSelector(GLOBAL_SELECTOR.PERMISSIONS)
  const { user } = currentPermissions

  const userPermissionsEnabled = checkPermission(user)

  const handleClose = () => dispatch(ACTIONS.SEGMENTS.CLOSE())

  const getTabContent = id => {
    const TabContent = TABS_CONTENT[id]
    return <TabContent />
  }

  const getTabs = () => SEGMENT_TABNAME.map(({ id, name }) => ({
    id,
    title: <span>{name}</span>,
    content: getTabContent(id)
  }))

  const onTabSelect = key => {
    setCurrentTab(key)
  }

  return (
    <Offcanvas
      show={isOpen}
      handleClose={handleClose}
      exludeCloseClass={['.redactor-dropdown', '.redactor-modal-box', '.redactor-context-toolbar']}
      title={`Manage Segments: ${title}`}
      canvasClass={styled.canvas}
    >
      <Tabs
        tabUnderline
        id='sns-segment-modal-tabs'
        tabs={getTabs()}
        defaultActive={parseInt(currentTab, 10)}
        onTabSelect={onTabSelect}
        permission={userPermissionsEnabled}
      />
    </Offcanvas>
  )
}
