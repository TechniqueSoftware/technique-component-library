import { produce } from 'immer'

import { LOADING, USER, CLUB, LOCATIONS, DATA, PERMISSIONS, DYNAMIC_TAGS } from './types'

export const initialState = {
  loading: true,
  error: '',
  user: {},
  delegated: {},
  club: {},
  locations: [],
  selectedLocation: {},
  permissions: { user: [], feature: [] },
  dynamicTags: []
}

const reducer = (state = initialState, { type, payload }) => produce(state, draft => {
  switch (type) {
    case DATA.GET:
      draft.loading = true
      break
    case DATA.ERROR:
      draft.error = payload
      draft.loading = false
      break

    case USER.SET_LOGGED_IN:
      draft.user = payload
      break
    case USER.SET_DELEGATED:
      draft.delegated = payload
      break

    case CLUB.SET:
      draft.club = payload
      break

    case LOCATIONS.SET_ALL:
      draft.locations = payload
      break
    case LOCATIONS.SET:
      draft.selectedLocation = payload
      break

    case LOADING.FINISHED:
      draft.loading = false
      break

    case PERMISSIONS.SET:
      draft.permissions = { ...draft.permissions, ...payload }
      break

    case PERMISSIONS.CLEAR:
      draft.permissions = {}
      break

    case DYNAMIC_TAGS.SET:
      draft.dynamicTags = payload
      break
  }
})

export default reducer
