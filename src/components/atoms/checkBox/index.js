import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const CheckBox = ({ disabled, name, options, type, onChange, selectedValues }) => {
  const [valuesChecked, setValuesChecked] = useState(selectedValues || [])

  useEffect(() => {
    setValuesChecked(selectedValues || [])
  }, [selectedValues])

  const handleChange = value => {
    const index = valuesChecked.indexOf(value)
    if (index > -1) {
      // If the value is already in the array, remove it
      const filtervalue = valuesChecked.filter(v => v !== value)
      setValuesChecked(filtervalue)
      onChange(filtervalue)
    } else {
      // If the value is not in the array, add it
      setValuesChecked([...valuesChecked, value])
      onChange([...valuesChecked, value])
    }
  }

  return (
    <Form>
      {options.map((item, index) => (
        <div key={`default-${index}`} className='mb-3'>
          <Form.Check
            role='checkbox'
            disabled={disabled || item.disabled}
            name={name}
            type={type}
            label={`${item.name}`}
            id={`default-${item.name}`}
            value={item.value}
            checked={valuesChecked.includes(item.value)}
            onChange={() => handleChange(item.value)}
          />
        </div>
      ))}
    </Form>

  )
}

CheckBox.propTypes = {
  disabled: PropTypes.bool,
  selectedValues: PropTypes.array,
  options: PropTypes.array,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}

export default CheckBox
