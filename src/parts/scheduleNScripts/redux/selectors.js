import { createSelector } from 'reselect'
import { get } from 'lodash'

import { key } from './types'
import { initialState } from './reducer'

const reducer = state => get(state, key, initialState)

const getLoading = createSelector(
  reducer, state => get(state, 'loading', false)
)

const getError = createSelector(
  reducer, state => get(state, 'error', '')
)

const getSnackbar = createSelector(
  reducer, state => get(state, 'snackbar', '')
)

const getFollowups = createSelector(
  reducer, state => get(state, 'followups', [])
)

const getTouchpointCrud = createSelector(
  reducer, state => get(state, 'touchpointCrud', {})
)

const getSegments = createSelector(
  reducer, state => get(state, 'segments', [])
)

const getSegmentAttributes = createSelector(
  reducer, state => get(state, 'segmentAttributes', { marketing: [], membership: [] })
)

const getSegmentModal = createSelector(
  reducer, state => get(state, 'segmentModalData', { isOpen: false, title: '', error: '' })
)

const getCanEditScripts = createSelector(
  reducer, state => get(state, 'canEditScripts', false)
)

const getCanEditSchedules = createSelector(
  reducer, state => get(state, 'canEditSchedules', false)
)

const getInnerPermissions = createSelector(
  reducer, state => get(state, 'innerPermissions', {})
)

const getSegmentLocations = createSelector(
  reducer, state => get(state, 'segmentLocations', [])
)

const getSegmentList = createSelector(
  reducer, state => get(state, 'segmentList', [])
)

const getCopySegmentProcess = createSelector(
  reducer, state => get(state, 'copyInProcess', {})
)

const getPopupAlert = createSelector(
  reducer, state => get(state, 'popupAlert', '')
)

const getStatus = createSelector(
  [
    reducer,
    (_, { followUpType, followUpStatus }) => ({ followUpType, followUpStatus })
  ],
  (state, { followUpType, followUpStatus }) => {
    const followups = get(state, 'followups', [])

    const status = followups.reduce((acc, curr) => {
      if (curr.type !== followUpType) return acc
      return curr.statuses.find(s => s.id === `${followUpStatus}`) || acc
    }, null)
    return status
  }
)

export default {
  LOADING: getLoading,
  ERROR: getError,
  FOLLOWUPS: getFollowups,
  TOUCHPOINT_CRUD: getTouchpointCrud,
  CAN_EDIT_SCRIPTS: getCanEditScripts,
  CAN_EDIT_SCHEDULES: getCanEditSchedules,
  STATUS: getStatus,
  SEGMENTS: getSegments,
  SEGMENT_MODAL_DATA: getSegmentModal,
  SEGMENT_ATTRIBUTES: getSegmentAttributes,
  SNACKBAR: getSnackbar,
  INNER_PERMISSIONS: getInnerPermissions,
  SEGMENT_LOCATIONS: getSegmentLocations,
  SEGMENT_LIST: getSegmentList,
  SEGMENT_COPY_PROCESS: getCopySegmentProcess,
  POPUP_ALERT: getPopupAlert
}
