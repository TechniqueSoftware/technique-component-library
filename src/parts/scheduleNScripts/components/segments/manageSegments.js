import React, { useState } from 'react'
import { Button } from '@components/atoms'
import { BUTTON_VARIANT, COLORS, SIZES } from '@global/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS, SELECTORS } from '@parts/scheduleNScripts/redux'
import { ListGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { GLOBAL_SELECTOR } from '@redux/global'
import moment from 'moment-timezone'
import EditSegment from './editSegment'
import { unparseAttributes } from '../utils'
import DeleteConfirmation from './confirmationWarning'

const emptyCrud = {
  name: { value: '', error: '', validated: false },
  selectedAttributes: [{ name: 'Select', value: '' }],
  segmentId: undefined
}

export default function ManageSegments () {
  const dispatch = useDispatch()
  const segments = useSelector(SELECTORS.SEGMENTS)
  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const selectedLocation = useSelector(GLOBAL_SELECTOR.SELECTED_LOCATION)
  const [segmentToDelete, setSegmentToDelete] = useState()
  const [segmentIsOpen, setSegmentIsOpen] = useState(false)
  const [segmentCrud, setSegmentCrud] = useState(emptyCrud)
  const { followUpType, followUpStatus } = useSelector(SELECTORS.SEGMENT_MODAL_DATA)

  const getAttributes = atts => atts.map(({ attributeValue }) => attributeValue).join(', ')

  const handleNewSegment = () => {
    if (segmentIsOpen) return
    setSegmentCrud(emptyCrud)
    setSegmentIsOpen(true)
  }

  const setSegmentData = (keyword, data) => setSegmentCrud({ ...segmentCrud, [keyword]: data })
  const closeCrud = () => setSegmentIsOpen(false)

  const handleEdit = ({ name, segmentAttributes, segmentId }) => {
    setSegmentCrud({
      name: { value: name },
      selectedAttributes: unparseAttributes(segmentAttributes),
      segmentId
    })
    setSegmentIsOpen(true)
  }

  const openDeleteConfirmation = segment => setSegmentToDelete(segment)
  const closeDeleteConfirmation = () => setSegmentToDelete(undefined)
  const handleDelete = () => {
    dispatch(
      ACTIONS.SEGMENTS.DELETE({
        segment: segmentToDelete,
        onSave: closeDeleteConfirmation,
        followUpType,
        followUpStatus
      })
    )
  }

  const parseEffectiveDate = timestamp => moment.tz(timestamp, selectedLocation.timeZone).format('MM-DD-YY')

  return (
    <Card className='border-0'>
      <Card.Body>
        <h5>
          <span>Recipients who do not meet any segment criteria will receive the default status scripts.</span>{' '}
          {!segments.length ? <span>No segments have been created.</span> : null}
        </h5>

        {segmentIsOpen && !segmentCrud.segmentId ? (
          <EditSegment handleClose={closeCrud} segmentCrud={segmentCrud} setSegmentCrud={setSegmentData} />
        ) : null}

        {segmentToDelete ? (
          <DeleteConfirmation
            variant='DELETE'
            onClose={closeDeleteConfirmation}
            onConfirmation={handleDelete}
          />
        ) : null}

        <ListGroup className='my-2' variant='flush'>
          {segments.map(segment => {
            const { segmentAttributes, segmentId, name, updatedAt } = segment
            return segmentIsOpen && segmentCrud.segmentId === segmentId ? (
              <EditSegment
                key={segmentId}
                handleClose={closeCrud}
                initialAttributes={segmentAttributes}
                openDeleteConfirmation={() => openDeleteConfirmation(segment)}
                segmentCrud={segmentCrud}
                setSegmentCrud={setSegmentData}
              />
            ) : (
              <ListGroup.Item key={segmentId} className='border-0 d-flex flex-column'>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <Button
                      className='fs-5 p-0 fw-bold'
                      color={COLORS.DARK}
                      onClick={() => handleEdit(segment)}
                      variant={BUTTON_VARIANT.GHOST}
                      label={name}
                    />
                    <i className={`m-2 text-${COLORS.SECONDARY}`}>Effective date: {parseEffectiveDate(updatedAt)}</i>
                  </div>
                  {canEditScripts ? (
                    <div className='d-flex flex-row'>
                      <Button
                        title='Edit'
                        className='fs-5'
                        variant={BUTTON_VARIANT.LINK}
                        color={COLORS.DARK}
                        icon='BsPencil'
                        onClick={() => handleEdit(segment)}
                      />
                      <Button
                        title='Delete'
                        className='fs-5'
                        variant={BUTTON_VARIANT.LINK}
                        color={COLORS.DARK}
                        icon='BsTrash'
                        onClick={() => openDeleteConfirmation(segment)}
                      />
                    </div>
                  ) : null}
                </div>
                <p className='flex-row mt-2'>
                  <span>{segmentAttributes[0]?.attributeType}:</span> <span>{getAttributes(segmentAttributes)}</span>
                </p>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Card.Body>
      {canEditScripts ? (
        <Button
          className='p-0 mb-3'
          variant={BUTTON_VARIANT.LINK}
          label='Add new Segment'
          size={SIZES.LG}
          onClick={handleNewSegment}
        />
      ) : null}
    </Card>
  )
}
