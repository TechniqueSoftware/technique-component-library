import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { COLORS } from '@global/constants'

import { Button, Input, CheckBox } from '@components/atoms'
import Modal from '@components/modal'

import { ACTIONS, SELECTORS, Manager } from './redux'
import styles from './style.module.scss'

const ManageTags = ({ tagButtonVariant, buttonLable }) => {
  const dispatch = useDispatch()

  const [newTagValue, setNewTagValue] = useState('')
  const [tagNameError, setTagNameError] = useState('')
  const [show, setShow] = useState(false)
  const [selectedTags, setselectedTags] = useState([])
  const tagsList = useSelector(SELECTORS.TAGS)

  useEffect(() => {
    if (show) { dispatch(ACTIONS.DATA.REQUEST_TAGS()) }
  }, [show])

  const handleShow = () => setShow(true)

  const handleClose = () => {
    setShow(false)
  }

  const handleChange = obj => {
    setNewTagValue(obj.value)
  }

  const handleSelectAll = () => {
    setselectedTags(tagsList.map(item => item.tagId))
  }
  const handleSelectNone = () => {
    setselectedTags([])
  }
  const handleDelete = () => {
    dispatch(ACTIONS.DATA.DELETE_TAGS(selectedTags))
  }
  const handleCheckbox = value => {
    setselectedTags(value)
  }

  const handleSave = () => {
    if (newTagValue === '') {
      setTagNameError('Please provide value')
      return false
    }

    dispatch(ACTIONS.DATA.SAVE_TAGS({ newTagValue }))
    setNewTagValue('')
  }

  const optiontagsList = tagsList.map(tag => ({
    ...tag,
    name: `${tag.tagName} (${tag.tagTemplates.length})`,
    value: tag.tagId
  }))

  return (
    <Manager>
      <div className={tagButtonVariant === 'link' ? '' : styles.tagsButton}>
        <Button
          label={buttonLable}
          disabled={false}
          onClick={handleShow}
          icon='BsTagFill'
          variant={tagButtonVariant}
          color={buttonLable ? 'secondary' : ''}
        />
      </div>
      <div />
      <Modal
        show={show}
        onHide={handleClose}
        scrollable
        className={styles.modalWidth}
      >
        <Modal.Header
          onHide={handleClose}
        >
          <Modal.Title>Manage Tags</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { tagsList.length > 0
          && (
          <div className={styles.selectButton}>
            <Button
              className={styles.selectAll}
              color={COLORS.PRIMARY}
              label='Select all'
              variant='link'
              onClick={handleSelectAll}
            />
            <Button
              className={styles.selectNone}
              color={COLORS.PRIMARY}
              label='None'
              variant='link'
              onClick={handleSelectNone}
            />
            <Button
              className={styles.selectDelete}
              icon='BsTrash'
              color={COLORS.PRIMARY}
              label='Delete'
              variant='link'
              onClick={handleDelete}
            />
          </div>
          )}
          <Row>
            <CheckBox
              disabled={false}
              options={optiontagsList}
              onChange={handleCheckbox}
              name='tags'
              type='checkbox'
              selectedValues={selectedTags}
            />
          </Row>
          <Form>
            <Row>
              <Col sm={4} className='form-col'>
                <Input
                  required
                  name='tagName'
                  placeholder='Add a new tag'
                  error={tagNameError}
                  value={newTagValue}
                  onChange={handleChange}
                />
              </Col>
              <Col sm={4} className='form-col'>
                <Button
                  className={styles.saveBtn}
                  color={COLORS.PRIMARY}
                  label='Save'
                  onClick={handleSave}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Manager>
  )
}

ManageTags.propTypes = {
  tagButtonVariant: PropTypes.string,
  buttonLable: PropTypes.string
}

ManageTags.defaultProps = {
  buttonLable: 'Manage Tags'
}

export default ManageTags
