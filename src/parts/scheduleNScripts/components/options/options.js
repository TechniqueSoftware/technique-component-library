import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Icon } from '@components/atoms'
import ListGroup from 'react-bootstrap/ListGroup'

import { BUTTON_VARIANT } from '@global/constants'
import { Stack } from 'react-bootstrap'
import { SELECTORS, ACTIONS } from '../../redux'
import { TP_ACTION_TYPES } from '../../constants'

const Options = ({ handleScript }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const dispatch = useDispatch()
  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const canEditSchedules = useSelector(SELECTORS.CAN_EDIT_SCHEDULES)
  const tp = useSelector(SELECTORS.TOUCHPOINT_CRUD).data

  const handleSchedule = () => dispatch(ACTIONS.TOUCHPOINT.EDIT())
  const handleDelete = () => dispatch(ACTIONS.TOUCHPOINT.DELETE())
  const handleEdit = () => handleScript(tp, TP_ACTION_TYPES.CALL)

  return (
    <ListGroup variant='flush'>
      {canEditSchedules && (
        <ListGroup.Item
          className='border-0 d-flex flex-row fs-5 align-items-center'
          onClick={handleSchedule}
          action
        >
          <Icon name='BsCalendar3' className='text-muted me-3' />
          Edit Schedule
        </ListGroup.Item>
      )}

      {canEditScripts && (
        <ListGroup.Item
          className='border-0 d-flex flex-row fs-5 align-items-center'
          onClick={handleEdit}
          action
        >
          <Icon name='BsPencil' className='text-muted me-3' />
          Edit Scripts
        </ListGroup.Item>
      )}

      {canEditSchedules && (
        <ListGroup.Item
          className='border-0 d-flex flex-row fs-5 align-items-center'
          onClick={() => setShowDeleteConfirmation(true)}
          action
        >
          <Icon name='BsTrash' className='text-muted me-3' />
          Delete Schedule
        </ListGroup.Item>
      )}

      {showDeleteConfirmation && (
        <>
          <p className='text-danger fs-5 my-3'>Are you sure you want to delete this touchpoint?</p>
          <Stack className='gap-10' direction='horizontal'>
            <Button
              label='Cancel'
              variant={BUTTON_VARIANT.OUTLINE}
              className='ms-auto fs-5'
              onClick={() => setShowDeleteConfirmation(false)}
            />
            <Button label='Ok' className='ms-4 fs-5' onClick={handleDelete} />
          </Stack>
        </>
      )}
    </ListGroup>
  )
}

Options.propTypes = {
  handleScript: PropTypes.func
}

export default Options
