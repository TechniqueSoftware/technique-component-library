import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BDropdown from 'react-bootstrap/Dropdown'
import { COLORS, SIZES } from '@global/constants'
import { Form } from 'react-bootstrap'
import styles from './styles.module.scss'
import ICONS from '../../../assets/icons'

const Dropdown = ({ name, disclaimer, label, options, onSelect, selected }) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  useEffect(() => {
    const newSelected = options.find(opt => opt.value === selected.value)
    setSelectedOption(newSelected || options[0])
  }, [options, selected])

  const handleSelect = option => {
    setSelectedOption(option)
    onSelect({ name, value: option })
  }

  return (
    <Form.Group className='w-100'>
      {label ? <Form.Label className='fs-6'>{label}</Form.Label> : null}
      <BDropdown className='w-100'>
        <BDropdown.Toggle className={styles.dropdownToggle} size={SIZES.MD} variant={COLORS.GREY} id={name}>
          {selectedOption.name}
        </BDropdown.Toggle>

        <BDropdown.Menu className={styles.dropdownMenu}>
          {options.map(option => (
            <BDropdown.Item
              className='d-flex flex-row align-items-center'
              key={`${name}-${option.name}`}
              onClick={() => handleSelect(option)}
            >
              <span>{option.name}</span>
              {option.data?.length ? (
                <div className={styles.dataContainer}>
                  {option.data.map((dataItem, idx) => (
                    <div className={styles.dataItem} key={dataItem.text + idx}>
                      <img alt={dataItem.icon} src={ICONS[dataItem.icon]} />
                      <span>{dataItem.text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </BDropdown.Item>
          ))}
        </BDropdown.Menu>
      </BDropdown>
      {disclaimer ? <i>{disclaimer}</i> : null}
    </Form.Group>
  )
}

const dropdownOption = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string
    })
  )
})

Dropdown.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  selected: dropdownOption,
  options: PropTypes.arrayOf(dropdownOption),
  onSelect: PropTypes.func.isRequired,
  disclaimer: PropTypes.string
}

Dropdown.defaultProps = {
  name: 'dropdown',
  label: 'Select',
  options: []
}

export default Dropdown
