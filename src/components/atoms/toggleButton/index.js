import React, { useState, useEffect } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Toggle from 'react-bootstrap/ToggleButton'
import PropTypes from 'prop-types'
import { COLORS } from '@global/constants'
import styles from './styles.module.scss'

const ToggleButton = ({ className = '', disabled, name, radios, onChange, selectedValue }) => {
  const [radioValue, setRadioValue] = useState(selectedValue)

  useEffect(() => {
    setRadioValue(selectedValue)
  }, [selectedValue])

  const handleChange = value => {
    setRadioValue(value)
    onChange(value)
  }
  return (
    <ButtonGroup className={`${className} ${styles.btngroup}`}>
      {radios && radios.map(radio => (
        <Toggle
          disabled={disabled}
          role='radio'
          key={radio.value}
          id={`radio-${radio.value}`}
          type='radio'
          variant={`outline-${COLORS.PRIMARY}`}
          name={name}
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={e => handleChange(e.currentTarget.value)}
        >
          {radio.name}
        </Toggle>
      ))}
    </ButtonGroup>
  )
}

ToggleButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  radios: PropTypes.array,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string
}

export default ToggleButton
