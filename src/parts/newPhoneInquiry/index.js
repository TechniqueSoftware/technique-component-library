import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Form, Card } from 'react-bootstrap'

import { COLORS } from '@global/constants'
import { checkField, checkSelect } from '@utils/validation'
import { useWindowWidth } from '@utils/device'
import { GLOBAL_SELECTOR } from '@redux/global'

import { Button, Input, Alert } from '@components/atoms'
import Modal from '@components/modal'
import TILocationSelect from './components/TILocationSelect'
import AppointmentAccordion from './components/AppointmentAccordion'

import { ACTIONS, SELECTORS, Manager } from './redux'
import styles from './style.module.css'

const APPOINTMENT_FIELDS = ['contact', 'time', 'date']

const Inquiry = () => {
  const dispatch = useDispatch()

  const locations = useSelector(GLOBAL_SELECTOR.LOCATIONS)
  const script = useSelector(SELECTORS.SCRIPT)
  const selectedLocation = useSelector(SELECTORS.SELECTED_LOCATION)
  const form = useSelector(SELECTORS.FORM_DATA)
  const formResponse = useSelector(SELECTORS.FORM_RESPONSE)
  const appointmentEnabled = useSelector(SELECTORS.APPOINTMENT_ENABLED)

  const [show, setShow] = useState(false)

  const windowWidth = useWindowWidth()

  const handleShow = () => setShow(true)

  const handleClose = () => {
    dispatch(ACTIONS.DATA.CLEAR())
    setShow(false)
  }

  const handleChange = ({ name, value, error = '', validated = false }) => {
    if (/^\s/.test(value)) value = ''
    dispatch(ACTIONS.DATA.SET({
      name,
      data: { value, error, validated }
    }))
  }

  const handleSave = () => {
    const errors = {}
    const formKeys = appointmentEnabled
      ? Object.keys(form)
      : Object.keys(form).filter(k => !APPOINTMENT_FIELDS.includes(k))

    formKeys.forEach(key => {
      const field = form[key]
      const { type, value, required, relatedField, error } = field
      const isAppointmentField = APPOINTMENT_FIELDS.includes(key)
      const isRequired = isAppointmentField ? appointmentEnabled : required
      let fieldError = ''
      if (type === 'select') {
        const retval = checkSelect(field, key, isRequired)
        fieldError = error || retval.error
      } else {
        fieldError = error || checkField({ type, value, required: isRequired, relatedField: form[relatedField] })
      }

      if (fieldError) {
        const name = field.label
        errors[`${name}`] = fieldError
      }

      dispatch(ACTIONS.DATA.SET({
        name: key,
        data: { ...form[key], error: fieldError, validated: true }
      }))
    })

    if (Object.keys(errors).length === 0) {
      dispatch(ACTIONS.SUBMIT.SEND())
    } else {
      errors.status = 400
      errors.code = 'FORM_SUBMISSION_ERROR'
      dispatch(ACTIONS.SUBMIT.ERROR(errors))
    }
  }

  // on form submission: if the response is a duplicate user, fetch that user's information
  useEffect(() => {
    if (formResponse.code === 'DUPLICATE_USER') dispatch(ACTIONS.DATA.REQUEST_USER_DATA(formResponse.user))
  }, [formResponse.code])

  useEffect(() => dispatch(ACTIONS.DATA.REQUEST_SCRIPT_DATA()), [selectedLocation])

  return locations && (
    <Manager>
      <div className={styles.inqButton}>
        <Button
          label={windowWidth > 1200 ? 'TEST TEST TEST' : 'T.I. Inquiry'}
          disabled={!locations.length}
          onClick={handleShow}
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        scrollable
      >
        <Modal.Header
          onHide={handleClose}
          className={styles.modalHeader}
        >
          <Modal.Title>TEEEEEEEST</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={4} className='form-col'>
              <Form>
                <TILocationSelect name='locationSelect' required />
                <Input
                  name='firstName'
                  type={form.firstName.type}
                  label={form.firstName.label}
                  value={form.firstName.value}
                  error={form.firstName.error}
                  required={form.firstName.required}
                  validated={form.firstName.validated}
                  onChange={handleChange}
                />
                <Input
                  name='lastName'
                  type={form.lastName.type}
                  label={form.lastName.label}
                  value={form.lastName.value}
                  error={form.lastName.error}
                  required={form.lastName.required}
                  validated={form.lastName.validated}
                  onChange={handleChange}
                />
                <div className={styles.relatedFieldsContainer}>
                  <div className={styles.relatedFields}>
                    <Input
                      name='email'
                      type={form.email.type}
                      label={form.email.label}
                      value={form.email.value}
                      error={form.email.error}
                      required={form.email.required}
                      validated={form.email.validated}
                      relatedField={form.mobilePhone}
                      onChange={handleChange}
                    />
                    <Input
                      name='mobilePhone'
                      type={form.mobilePhone.type}
                      label={form.mobilePhone.label}
                      value={form.mobilePhone.value}
                      required={form.mobilePhone.required}
                      error={form.mobilePhone.error}
                      validated={form.mobilePhone.validated}
                      relatedField={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Form>
              <AppointmentAccordion />
            </Col>
            <Col sm={8} className='script-col'>
              <Card
                bg='light'
                className='h-100'
              >
                <Card.Body>
                  <div dangerouslySetInnerHTML={{ __html: script }} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <div className={styles.inqFooter}>
            {
              ((formResponse.code === 'SUCCESS' && formResponse.firstName)
              || (formResponse.code === 'DUPLICATE_USER' && formResponse.user.firstName)
              || (formResponse.code === 'BAD_REQUEST')
              || (formResponse.code === 'FORM_SUBMISSION_ERROR')
              || (formResponse.code === 'INVALID_OWNER_LOCATION')
              || (formResponse.code === 'INVALID_ATTENDEE')
              || (formResponse.code === undefined && formResponse.status === 400))
              && <Alert alertData={formResponse} />
            }
            <div className={styles.btnContainer}>
              <Button
                className={styles.saveBtn}
                color={COLORS.PRIMARY}
                label='Save'
                onClick={handleSave}
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </Manager>
  )
}

export default Inquiry
