import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

import { PopupAlert, Icon, Snackbar } from '@components/atoms'
import { Tabs, LocationSelect } from '@components'

import { GLOBAL_SELECTOR } from '@redux/global'

import StatusSchedules from './statusSchedules'
import Menu from './components/options'
import { ACTIONS, SELECTORS, Manager } from './redux'
import { SNACKBAR_MESSAGES } from './constants'

import styles from './styles.module.scss'
import Segments from './components/segments'

const SnS = () => {
  const dispatch = useDispatch()

  const loading = useSelector(SELECTORS.LOADING)
  const error = useSelector(SELECTORS.ERROR)
  const followups = useSelector(SELECTORS.FOLLOWUPS)
  const snackbar = useSelector(SELECTORS.SNACKBAR)
  const popupAlert = useSelector(SELECTORS.POPUP_ALERT)
  const closeSnackbar = () => dispatch(ACTIONS.SNACKBAR.CLOSE())

  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const { followUpSegmentsAction } = useSelector(SELECTORS.INNER_PERMISSIONS)
  const selectedLocation = useSelector(GLOBAL_SELECTOR.SELECTED_LOCATION)
  const { unrestrictedAdmin } = useSelector(GLOBAL_SELECTOR.USER)
  const { isOpen } = useSelector(SELECTORS.SEGMENT_MODAL_DATA)
  const { isClub } = selectedLocation
  const overridesEdit = unrestrictedAdmin && isClub

  useEffect(() => {
    dispatch(ACTIONS.FOLLOWUPS.GET())
    dispatch(ACTIONS.FOLLOWUPS.GET_FEATURE_PERMISSIONS())
  }, [selectedLocation])

  useEffect(() => {
    if (!followUpSegmentsAction) return
    dispatch(ACTIONS.SEGMENTS.GET_ATTRIBUTES())
  }, [selectedLocation, followUpSegmentsAction])

  const handleScript = (tp, type) => {
    dispatch(ACTIONS.SCRIPTS.EDIT({
      action: type,
      data: { ...tp }
    }))
  }

  const getContent = (content, type) => (
    <ListGroup variant='flush' className='overflow-auto'>
      {content.map(status => (
        <ListGroup.Item key={status.id}>
          <StatusSchedules
            {...status}
            type={type}
            handleScript={handleScript}
          />
        </ListGroup.Item>
      )
      )}
    </ListGroup>
  )

  const handleTabSelect = key => {
    const { canEditSchedules, canEditScripts } = followups.find(({ id }) => id === key)
    dispatch(ACTIONS.FOLLOWUPS.PERMISSION({
      canEditSchedules: overridesEdit || canEditSchedules,
      canEditScripts: overridesEdit || canEditScripts
    }))
  }

  const getTabs = () => followups.map(({ id, name, statuses, type }) => ({
    id,
    title: name,
    content: getContent(statuses || [], type)
  }))

  const renderTabs = () => loading ? (
    <div className='d-flex justify-content-center'>
      <Spinner animation='border' role='status' />
    </div>
  ) : (
    <Tabs
      id='sns-tabs'
      tabs={getTabs()}
      onTabSelect={handleTabSelect}
    />
  )

  return (
    <Manager>
      {snackbar && <Snackbar handleClose={closeSnackbar} msg={SNACKBAR_MESSAGES[snackbar]} />}
      {popupAlert && <PopupAlert msg={popupAlert} handleClose={() => dispatch(ACTIONS.SEGMENTS.SET_ALERT(false))} />}
      <div className={styles.wrapper}>
        <div className='d-flex justify-content-between align-items-center'>
          <LocationSelect label={false} withRedirect />
          {!isClub ? (
            <div className='d-flex align-items-center gap-5'>
              <div className='d-flex align-items-center gap-3'>
                <p className='fw-bold'>Schedules are editable</p>
                <Icon
                  name={canEditSchedules ? 'BsCheckLg' : 'BsXLg'}
                  className={canEditSchedules ? 'text-success' : 'text-danger'}
                />
              </div>
              <div className='d-flex align-items-center gap-3'>
                <p className='fw-bold'>Scripts are editable</p>
                <Icon
                  name={canEditScripts ? 'BsCheckLg' : 'BsXLg'}
                  className={canEditScripts ? 'text-success' : 'text-danger'}
                />
              </div>
            </div>
          ) : null}
        </div>

        <hr />

        <Card body className='shadow-sm border-0'>
          {followUpSegmentsAction ? (
            <>
              <Card.Text>Edit scripts & schedules for the selected location if indicators above are green.</Card.Text>
              <Card.Text>
                Add status sub-segments and configure their touchpoints&apos; schedules and scripts independently from
                status touchpoints. Schedule touchpoints based on a number of days after a user enters the status.
                Changing a schedule affects newly scheduled follow-ups only. Email, Text, and Call icons on the
                touchpoints indicate the script types already configured; a Clock icon indicates an automatic follow-up.
              </Card.Text>
            </>
          ) : (
            <>
              <Card.Text>
                View and edit follow-up schedules and scripts on this page. When selecting a location from the dropdown
                menu, the access indicators to the right indicate whether scripts and schedules can be edited.
              </Card.Text>
              <br />
              <Card.Text>
                Select a tab to view the follow-up statuses for each type. Each box within a follow-up status represents
                a configured touchpoint scheduled immediately or a number of days after a user enters the status. The
                email, text, and call icons within each box show what script types are configured, and a clock icon
                indicates that a follow-up is automatic. Each schedule box has a menu button to manage scripts and
                schedules for users with permission. Changing a schedule affects newly scheduled follow-ups only.
              </Card.Text>
            </>
          )}
        </Card>

        <br />

        {renderTabs()}
        {error && <p>{error}</p>}
      </div>
      { isOpen ? <Segments /> : <Menu handleScript={handleScript} />}
    </Manager>
  )
}

export default SnS
