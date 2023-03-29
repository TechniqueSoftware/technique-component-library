import { createSelector } from 'reselect'
import { get } from 'lodash'

import { key } from './types'
import { initialState } from './reducer'

const reducer = state => get(state, key, initialState)

const getLoading = createSelector(
  reducer, state => get(state, 'loading', true)
)

const getError = createSelector(
  reducer, state => get(state, 'error', '')
)

const getUser = createSelector(
  reducer, state => get(state, 'user', {})
)

const getDelegatedUser = createSelector(
  reducer, state => get(state, 'delegated', {})
)

const getClub = createSelector(
  reducer, state => get(state, 'club', {})
)

const getLocations = createSelector(
  reducer, state => get(state, 'locations', [])
)

const selectedLocation = createSelector(
  reducer, state => get(state, 'selectedLocation', {})
)

const getPermissions = createSelector(
  reducer, state => get(state, 'permissions', { user: [], feature: [] })
)

const getDynamicTags = createSelector(
  reducer, state => get(state, 'dynamicTags', [])
)

export default {
  LOADING: getLoading,
  ERROR: getError,
  USER: getUser,
  DELEGATED_USER: getDelegatedUser,
  CLUB: getClub,
  LOCATIONS: getLocations,
  PERMISSIONS: getPermissions,
  SELECTED_LOCATION: selectedLocation,
  DYNAMIC_TAGS: getDynamicTags
}
