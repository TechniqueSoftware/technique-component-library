/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ToggleButton from '@components/atoms/toggleButton'
import styles from './styles.module.scss'

const meridiem = [
  { value: 'AM', name: 'AM' },
  { value: 'PM', name: 'PM' }
]
const hours = Array.from({ length: 12 }, (_, i) => ({ name: i + 1, value: i + 1 }))
const minutes = Array.from({ length: 60 / 15 }, (_, i) => {
  const min = i === 0 ? '00' : i * 15
  return { name: min, value: min }
})

const TimePicker = ({ disabled, onChange, selectedValue }) => {
  const [hourSelected, setHourSelected] = useState()
  const [minuteSelected, setMinuteSelected] = useState()
  const [meridiemSelected, setMeridiemSelected] = useState('AM')

  useEffect(() => {
    if (!selectedValue) return
    setMeridiemSelected(selectedValue.meridiem)
    setMinuteSelected(selectedValue.minute)
    setHourSelected(selectedValue.hour)
  }, [selectedValue])

  const handleChangeHour = val => {
    setHourSelected(val)
    onChange(val, minuteSelected, meridiemSelected)
  }

  const handleChangeMeridiem = value => {
    setMeridiemSelected(value)
    onChange(hourSelected, minuteSelected, value)
  }

  const handleChangeMinute = value => {
    setMinuteSelected(value)
    onChange(hourSelected, value, meridiemSelected)
  }

  return (
    <div>
      <Form.Select
        disabled={disabled}
        role='combobox'
        onChange={e => handleChangeHour(e.target.value)}
        className={styles.timepicker__select}
        value={hourSelected}
      >
        {hours.map((item, index) => (
          <option
            key={index}
            value={item.value}
          >{item.name}
          </option>
        ))}
      </Form.Select>
      :
      <Form.Select
        disabled={disabled}
        onChange={e => handleChangeMinute(e.target.value)}
        className={styles.timepicker__select}
        value={minuteSelected}
      >
        {minutes.map((minute, index) => (
          <option
            key={index}
            value={minute.value}
          >
            {minute.name}
          </option>
        ))}
      </Form.Select>
      <ToggleButton
        disabled={disabled}
        name='am-pm'
        radios={meridiem}
        onChange={handleChangeMeridiem}
        selectedValue={meridiemSelected}
      />
    </div>
  )
}

TimePicker.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  selectedValue: PropTypes.object
}

export default TimePicker
