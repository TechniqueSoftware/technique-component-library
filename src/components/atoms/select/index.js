import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Form, Row, Col } from 'react-bootstrap'

import { checkField } from '@utils/validation'

const Select = ({ name, disclaimer, label, required, disabled, options, selected,
  onSelect, error, validated, layoutHorizontal, feedback }) => {
  const [isGroup, setIsGroup] = useState(false)
  useEffect(() => {
    setIsGroup(!!options[0]?.options)
  }, [options])

  const findSelected = val => {
    if (!isGroup) return options.find(({ value }) => `${value}` === val)

    for (let i = 0; i < options.length; i++) {
      const opts = options[i].options
      const selected = opts.find(({ value }) => `${value}` === val)
      if (selected) return selected
    }
  }

  const handleChange = val => {
    const newSelected = findSelected(val)

    const error = checkField({ type: 'select', value: newSelected, required })
    onSelect({ name, value: newSelected, error, validated: false })
  }

  const renderOptions = opt => (
    <>
      {opt.map((option, index) => (
        <option
          key={`${option.name}-${option.value}-${index}`}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </>
  )

  const renderGroup = () => (
    <>
      {options.map((group, index) => (
        <optgroup label={group.name} key={`group-${group.name}-${index}`}>
          {renderOptions(group.options)}
        </optgroup>
      ))}
    </>
  )

  if (!options.length) return null

  const renderHorizontal = () => (
    <Form.Group controlId={name}>
      <Row>
        {label && <Form.Label column='lg' lg={5}>{label}</Form.Label>}
        <Col>
          <Form.Select
            size='md'
            role='combobox'
            type='select'
            aria-label={`Select ${label}`}
            required={required}
            disabled={disabled}
            onChange={e => handleChange(e.target.value)}
            value={selected?.value}
            isInvalid={validated && error}
            isValid={validated && !error}
          >
            {isGroup ? renderGroup() : renderOptions(options)}
          </Form.Select>
          {disclaimer ? <small><i>{disclaimer}</i></small> : null}
          {feedback && error ? <small className='text-danger d-block'>{error}</small> : null}
        </Col>
      </Row>
    </Form.Group>
  )
  const renderVerticle = () => (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        role='combobox'
        type='select'
        aria-label={`Select ${label}`}
        required={required}
        disabled={disabled}
        onChange={e => handleChange(e.target.value)}
        value={selected?.value}
        isInvalid={validated && error}
        isValid={validated && !error}
      >
        {isGroup ? renderGroup() : renderOptions(options)}
      </Form.Select>
    </Form.Group>
  )

  return (layoutHorizontal) ? renderHorizontal() : renderVerticle()
}

const optionsPt = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
)

const groupPT = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    options: optionsPt
  })
)

Select.propTypes = {
  disclaimer: PropTypes.string,
  feedback: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.oneOfType([
    optionsPt,
    groupPT
  ]),
  onSelect: PropTypes.func.isRequired,
  layoutHorizontal: PropTypes.bool,
  error: PropTypes.string,
  validated: PropTypes.bool
}

Select.defaultProps = {
  feedback: false,
  name: 'Select',
  label: 'Select',
  disabled: false,
  required: false,
  options: [],
  error: '',
  validated: false
}

export default Select
