import React from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap'
import { checkField } from '@utils/validation'

const restrictedSymbols = ['E', 'e', '-', '+', '.']

const Input = props => {
  const {
    disclaimer,
    name,
    type,
    label,
    value,
    error,
    required,
    relatedField,
    placeholder,
    disabled,
    max,
    min,
    validated,
    isolated,
    noFeedback,
    onChange,
    layoutHorizontal
  } = props

  const handleChange = (e, value, error = '', validated = false) => {
    onChange({ e, name, value, error, validated })
  }

  const validateOnExit = e => {
    const { value } = e.target
    const error = checkField({ type, value, required, relatedField })
    handleChange(e, value, error, true)

    // if email/phone passes validation, clear the relatedField's error
    if (error === '' && relatedField && relatedField.error) {
      const relatedName = relatedField.type === 'phone' ? 'mobilePhone' : 'email'
      onChange({ name: relatedName, value: relatedField.value, error: '', validated: false })
    }
  }

  const renderHorizontal = () => (
    <Form.Group className={!isolated ? 'mb-3' : ''} controlId={name}>
      <Row>
        {label && <Form.Label column='lg' lg={5}>{`${label} ${required ? '*' : ''}`}</Form.Label>}
        <Col>
          <Form.Control
            required={required}
            max={max}
            size='md'
            min={min}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            isInvalid={validated && error}
            isValid={validated && !error}
            onChange={e => handleChange(e, e.target.value)}
            onKeyDown={e => type === 'number' && restrictedSymbols.includes(e.key) ? e.preventDefault() : undefined}
            onBlur={e => validateOnExit(e)}
          />
          {!noFeedback && error && <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>}
        </Col>
      </Row>
    </Form.Group>
  )
  const renderVerticle = () => (
    <Form.Group className={!isolated ? 'mb-3' : ''} controlId={name}>
      {label && <Form.Label>{`${label} ${required ? '*' : ''}`}</Form.Label>}
      <Form.Control
        required={required}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={validated && error}
        isValid={validated && !error}
        onChange={e => handleChange(e, e.target.value)}
        onKeyDown={e => (type === 'number' && restrictedSymbols.includes(e.key) ? e.preventDefault() : undefined)}
        onBlur={e => validateOnExit(e)}
        min={min}
        max={max}
      />
      {disclaimer ? <small><i>{disclaimer}</i></small> : null}
      {!noFeedback && error && <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>}
    </Form.Group>
  )

  return (layoutHorizontal) ? renderHorizontal() : renderVerticle()
}

Input.propTypes = {
  disclaimer: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  relatedField: PropTypes.object,
  disabled: PropTypes.bool,
  validated: PropTypes.bool,
  isolated: PropTypes.bool,
  noFeedback: PropTypes.bool,
  onChange: PropTypes.func,
  layoutHorizontal: PropTypes.bool
}

export default Input
