import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@components/atoms'
import { checkSelect } from '@utils/validation'

import { GLOBAL_SELECTOR } from '@redux/global'
import { ACTIONS, SELECTORS } from '../redux'

const TILocationSelect = ({ name, required, disabled }) => {
  const dispatch = useDispatch()

  const user = useSelector(GLOBAL_SELECTOR.USER)
  const locations = useSelector(GLOBAL_SELECTOR.LOCATIONS)
  const selectedLocation = useSelector(SELECTORS.SELECTED_LOCATION)

  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    const locationOptions = locations.map(({ locationName, locationId }) => ({
      name: locationName,
      value: `${locationId}`
    }))
    const options = !user.locationId ? [{ name: 'Select a location', value: '' }, ...locationOptions] : locationOptions
    setSelectOptions(options)
    const initialLocation = options.find(location => location.value === `${user?.locationId}`) || options[0]
    dispatch(ACTIONS.DATA.SELECT_LOCATION({
      name: 'locationSelect',
      value: initialLocation,
      error: '',
      validated: true
    }))
  }, [locations])

  const handleSelect = selected => {
    const { name, value } = selected
    const { error, validated } = checkSelect(selected, 'locationSelect', required)
    dispatch(ACTIONS.DATA.SELECT_LOCATION({ name, value, error, validated }))
  }

  return (
    <div className='mb-3'>
      {locations.length > 1 && (
      <Select
        name={name}
        label='Location'
        selected={selectedLocation?.value}
        options={selectOptions}
        onSelect={handleSelect}
        required={required}
        disabled={disabled}
        error={selectedLocation.error}
        validated={selectedLocation.validated}
      />
      )}
    </div>
  )
}

TILocationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

TILocationSelect.defaultProps = {
  required: false
}

export default TILocationSelect
