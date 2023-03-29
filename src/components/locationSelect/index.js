import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { GLOBAL_SELECTOR, GLOBAL_ACTIONS } from '@redux/global'

import { Select } from '@components/atoms'
import { getLocationIdFromUrl, urlClubIdRegex } from './utils'

const updateUrl = (clubId, locationId) => {
  const baseUrl = `${window.origin}${window.CONTEXT_PATH || ''}/action/ClubSettings/followup/scheduleAndScripts`
  window.open(`${baseUrl}/${clubId}${locationId ? `/${locationId}` : ''}`, '_self')
}

// TODO: Remove withRedirect functionality once old schedule and scripts page is removed
const LocationSelect = ({ required, disabled, label, withRedirect }) => {
  const dispatch = useDispatch()
  const club = useSelector(GLOBAL_SELECTOR.CLUB)
  const locations = useSelector(GLOBAL_SELECTOR.LOCATIONS)
  const selectedLocation = useSelector(GLOBAL_SELECTOR.SELECTED_LOCATION)
  const { unrestrictedAdmin, locationId } = useSelector(GLOBAL_SELECTOR.USER)
  const [options, setOptions] = useState([])

  const setLocationFromUrl = locs => {
    const path = window.location.pathname
    const isClubUrl = urlClubIdRegex(club.id).test(path)

    if (isClubUrl && !unrestrictedAdmin) return updateUrl(club.id, locationId)
    if (isClubUrl && unrestrictedAdmin) {
      const clubFromUrl = locs.find(({ clubId }) => clubId === club.id)
      return dispatch(GLOBAL_ACTIONS.LOCATIONS.SELECT(clubFromUrl))
    }

    const urlLocationId = getLocationIdFromUrl(path, club.id)
    const locationFromUrl = locs.find(({ locationId }) => locationId === urlLocationId)
    if (!locationFromUrl) return
    dispatch(GLOBAL_ACTIONS.LOCATIONS.SELECT(locationFromUrl))
  }

  useEffect(() => {
    const locationsGroup = {
      name: 'Locations',
      options: [...locations].sort((a, b) => a.locationName.localeCompare(b.locationName))
        .map(({ locationName, locationId }) => ({
          name: locationName,
          value: `${locationId}`,
          locationName,
          locationId
        }))
    }
    const clubGroup = {
      name: 'Default',
      options: [{
        name: club.name,
        value: club.id,
        clubId: club.id,
        isClub: true
      }]
    }
    setOptions(unrestrictedAdmin ? [clubGroup, locationsGroup] : [locationsGroup])
    if (withRedirect) setLocationFromUrl([clubGroup.options[0], ...locationsGroup.options])
  }, [unrestrictedAdmin, locations])

  const handleSelect = ({ value }) => {
    if (withRedirect) return updateUrl(club.id, value?.locationId)
    dispatch(GLOBAL_ACTIONS.LOCATIONS.SELECT(value))
  }

  return (
    <Select
      name='locationsSelect'
      label={label ? 'Location' : ''}
      options={options}
      onSelect={handleSelect}
      required={required}
      disabled={disabled}
      selected={selectedLocation}
    />
  )
}

LocationSelect.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.bool,
  withRedirect: PropTypes.bool

}

LocationSelect.defaultProps = {
  required: false,
  label: true,
  withRedirect: false
}

export default LocationSelect
