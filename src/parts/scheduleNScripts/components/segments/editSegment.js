import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Select } from '@components/atoms'
import { BUTTON_VARIANT, COLORS } from '@global/constants'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIONS, SELECTORS } from '@parts/scheduleNScripts/redux'
import { useClickOutside } from '@utils/hooks'
import { checkIfAttributeIsInUse, getSegmentStatusProp, parseAttributes } from '../utils'
import SaveIcon from '../../../../assets/svgs/saveIcon'
import ConfirmationWarning from './confirmationWarning'

const emptyAttribute = { name: 'Select', value: '' }
const needsRecalculation = (initialAttributes, selectedAttributes) => {
  if (!initialAttributes?.length) return false
  return initialAttributes.some(({ attributeValue }) => {
    const missingAttribute = !selectedAttributes.find(({ value }) => value === attributeValue)
    return missingAttribute
  })
}

export default function EditSegment ({
  handleClose,
  initialAttributes,
  openDeleteConfirmation,
  segmentCrud,
  setSegmentCrud
}) {
  const dispatch = useDispatch()
  const segments = useSelector(SELECTORS.SEGMENTS)
  const segmentModalData = useSelector(SELECTORS.SEGMENT_MODAL_DATA)
  const attributeId = getSegmentStatusProp(segmentModalData, 'attributeId')
  const attributeType = getSegmentStatusProp(segmentModalData, 'attributeType')
  const attributes = useSelector(SELECTORS.SEGMENT_ATTRIBUTES)[attributeId]

  const { name, selectedAttributes, segmentId } = segmentCrud
  const [dropdownData, setDropdownData] = useState([])
  const [showRecalculationWarning, setShowRecalculationWarning] = useState(false)
  const ref = useRef()
  useClickOutside(ref, handleClose, ['#recalculation-confirmation'])

  useEffect(() => {
    setDropdownData([emptyAttribute].concat(attributes.map(attr => ({ name: attr, value: attr }))))
  }, [attributes])

  const handleSave = () => {
    const segmentAttributes = parseAttributes(selectedAttributes, attributeType)
    dispatch(
      ACTIONS.SEGMENTS.SAVE({
        segmentId,
        segmentName: name.value,
        segmentAttributes,
        onSave: handleClose,
        followUpStatus: segmentModalData.followUpStatus,
        followUpType: segmentModalData.followUpType
      })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (selectedAttributes.concat(name).some(val => !!val.error)) return
    if (needsRecalculation(initialAttributes, selectedAttributes)) return setShowRecalculationWarning(true)
    return handleSave()
  }

  const addDropdown = () => {
    const noEmptyAttributes = selectedAttributes.every(att => att.value !== '')
    if (noEmptyAttributes) return setSegmentCrud('selectedAttributes', selectedAttributes.concat(emptyAttribute))
  }

  const handleSelect = (option, index) => {
    const { value, error } = option
    const newValue = value ? value.value : ''
    const attributeExists = checkIfAttributeIsInUse(segments, selectedAttributes, newValue, segmentId)
    const newAttributes = selectedAttributes.map((att, i) => {
      if (i !== index) return att
      return {
        ...att,
        name: newValue,
        value: newValue,
        error: attributeExists ? `${attributeType} is already in use!` : error,
        validated: value.name !== emptyAttribute.name
      }
    })
    setSegmentCrud('selectedAttributes', newAttributes)
  }

  const handleName = nameVal => {
    const newName = nameVal.value.length > 50 ? { ...nameVal, error: 'Name is too long', validated: true } : nameVal
    setSegmentCrud('name', newName)
  }

  const closeRecalculateConfirmation = () => setShowRecalculationWarning(false)

  return (
    <>
      {showRecalculationWarning ? (
        <ConfirmationWarning
          onClose={closeRecalculateConfirmation}
          onConfirmation={handleSave}
          variant='RECALCULATION'
        />
      ) : null}
      <Form ref={ref} className='border-top border-bottom my-4 py-4 border-grey' onSubmit={handleSubmit}>
        <div className='d-flex flex-row align-items-start'>
          <Col sm={5}>
            <Input
              onChange={handleName}
              value={name.value}
              placeholder='Segment name'
              name='segmentName'
              required
              validated={name.validated}
              error={name.error}
            />
          </Col>
          <Col className='d-flex flex-row' sm={{ span: 1, offset: 6 }}>
            <Button title='Save' className='fs-5' color={COLORS.DARK} variant={BUTTON_VARIANT.LINK} type='submit'>
              <SaveIcon aria-label='SaveIcon' />
            </Button>
            <Button
              title='Delete'
              className='fs-5'
              color={COLORS.DARK}
              icon='BsTrash'
              variant={BUTTON_VARIANT.LINK}
              onClick={segmentId ? openDeleteConfirmation : handleClose}
            />
          </Col>
        </div>

        <Row>
          <Col sm={11}>
            <Row>
              {selectedAttributes.map((attr, i) => {
                const isRequired = i === 0
                return (
                  <Col key={`${attr.value}-${i}`} sm={6}>
                    <Select
                      feedback
                      name='sourcesSelect'
                      label={isRequired ? attributeType : 'or'}
                      options={dropdownData}
                      required={isRequired}
                      onSelect={o => handleSelect(o, i)}
                      selected={attr}
                      layoutHorizontal
                      validated={attr.validated}
                      error={attr.error}
                    />
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col className='d-flex flex-column align-items-center justify-self-end' sm={1}>
            <Button
              title={`Add ${attributeType}`}
              className='fs-5'
              color={COLORS.DARK}
              icon='BsPlusCircle'
              onClick={addDropdown}
              variant={BUTTON_VARIANT.LINK}
            />
          </Col>
        </Row>
      </Form>
    </>
  )
}

const attributesType = PropTypes.arrayOf(
  PropTypes.shape({ attributeType: PropTypes.string, attributeValue: PropTypes.string })
)

EditSegment.propTypes = {
  segmentCrud: PropTypes.shape({
    segmentId: PropTypes.number,
    name: PropTypes.object,
    selectedAttributes: attributesType
  }),
  setSegmentCrud: PropTypes.func,
  handleClose: PropTypes.func,
  openDeleteConfirmation: PropTypes.func,
  initialAttributes: attributesType
}
