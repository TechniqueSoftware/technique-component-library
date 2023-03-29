import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

import { BUTTON_VARIANT } from '@global/constants'

import { Button, Input } from '@components/atoms'
import { ACTIONS } from '../../redux'

const TYPE = {
  IMMEDIATE: 0,
  DAY: 1
}

const getIsRepeated = (tpDays, dayNum, newValue) => {
  const { filteredDays } = tpDays.reduce((acc, currDay) => {
    if (currDay !== `${dayNum}`) return { ...acc, filteredDays: acc.filteredDays.concat(currDay) }
    if (!acc.removed) return { ...acc, removed: true }
    return { ...acc, filteredDays: acc.filteredDays.concat(currDay) }
  }, { removed: false, filteredDays: [] })
  return filteredDays.includes(newValue)
}

const New = ({ id, tpDays, edit, followUpSeqNum, dayNum, setHasCloseButton }) => {
  const dispatch = useDispatch()

  const [selected, setSelected] = useState(() => {
    if (!edit) return TYPE.DAY
    return followUpSeqNum === 1 && dayNum === 0 ? TYPE.IMMEDIATE : TYPE.DAY
  })
  const [days, setDays] = useState(() => {
    const val = followUpSeqNum === 1 && dayNum === 0 ? '' : dayNum
    return {
      value: val ? `${val}` : '',
      error: '',
      validated: false
    }
  })

  const [isRepeated, setIsRepeated] = useState(false)

  if (isRepeated) {
    setHasCloseButton(false)
  }

  const handleSelectImmediate = () => {
    if (isRepeated && selected === TYPE.DAY) setIsRepeated(false)
    setSelected(TYPE.IMMEDIATE)
    setDays({ value: '', error: '', validated: false })
  }

  const handleSelectDays = () => {
    if (isRepeated && selected === TYPE.IMMEDIATE) setIsRepeated(false)
    setSelected(TYPE.DAY)
  }

  const handleChange = ({ value, error, validated }) => {
    setDays({ value, error, validated })
    if (isRepeated) setIsRepeated(false)
  }

  const saveAction = order => {
    const repeated = getIsRepeated(tpDays, dayNum, days.value || `${TYPE.IMMEDIATE}`)
    setIsRepeated(repeated)
    if (days.error) return
    if (selected === TYPE.DAY && days.value === '') {
      setDays({ ...days, error: 'Please enter days', validated: true })
      return
    }
    if (!edit) return dispatch(ACTIONS.TOUCHPOINT.NEW({ dayNum: parseInt(days.value || 0, 10) }))
    dispatch(ACTIONS.TOUCHPOINT.EDIT_TOUCHPOINT({ dayNum: parseInt(days.value || 0, 10), order }))
    if (repeated) setHasCloseButton(true)
  }

  const handleSave = () => {
    saveAction()
  }

  const handleClose = () => {
    dispatch(ACTIONS.TOUCHPOINT.CLOSE())
    setHasCloseButton(true)
  }

  return (
    <Form>
      <ListGroup variant='flush'>
        <ListGroup.Item
          disabled={isRepeated}
          className='border-0 d-flex flex-row fs-5 align-items-center'
          onClick={handleSelectImmediate}
        >
          <Form.Check
            inline
            label='Immediate'
            name='immediate'
            type='radio'
            onChange={handleSelectImmediate}
            checked={selected === TYPE.IMMEDIATE}
          />
        </ListGroup.Item>

        <ListGroup.Item
          disabled={isRepeated}
          className='border-0 d-flex flex-row fs-5 align-items-center'
          onClick={handleSelectDays}
        >
          <Form.Check
            inline
            label='Day'
            name='day'
            type='radio'
            onChange={handleSelectDays}
            checked={selected === TYPE.DAY}
          />

          <Form.Group controlId={`${id}_days`}>
            <Input
              min={1}
              name='day-touchpoint'
              type='number'
              value={days.value}
              error={days.error}
              validated={days.validated}
              required={selected === TYPE.DAY}
              onChange={handleChange}
              isolated
              noFeedback
            />
          </Form.Group>
        </ListGroup.Item>

        {selected === TYPE.DAY && !days.value && (
          <ListGroup.Item className='border-0 p-0'>
            <p className='text-danger text-center'>Required</p>
          </ListGroup.Item>
        )}

        <ListGroup.Item className='border-0'>
          <Button
            label='Save'
            className='ms-auto'
            disabled={isRepeated || (selected === TYPE.DAY && !days.value)}
            onClick={handleSave}
          />
        </ListGroup.Item>

        {isRepeated && (
          <>
            <ListGroup.Item className='border-0 mt-4 p-0'>
              <p className='text-danger text-center'>
                There are multiple Day {days.value} Touchpoints.
                Should this touchpoint be completed first or last?
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='border-0 d-flex justify-content-end mt-2'>
              <Button
                variant={BUTTON_VARIANT.OUTLINE}
                label='Last'
                onClick={handleClose}
              />

              <Button
                className='ms-4'
                label='First'
                onClick={() => saveAction('first')}
              />
            </ListGroup.Item>
          </>
        )}
      </ListGroup>
    </Form>
  )
}

New.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  tpDays: PropTypes.any,
  edit: PropTypes.bool,
  dayNum: PropTypes.number,
  followUpSeqNum: PropTypes.number,
  setHasCloseButton: PropTypes.func
}

New.defaultProps = {
  tpDays: []
}

export default New
