import { produce } from 'immer'
import { TP_OPTIONS } from './constants'
import TYPES from './types'

export const initialState = {
  loading: false,
  error: '',
  snackbar: '',
  followups: [],
  canEditScripts: false,
  canEditSchedules: false,
  touchpointCrud: {
    action: '',
    data: {},
    loading: false
  },
  script: {},
  segments: [],
  segmentModalData: {
    isOpen: false,
    title: '',
    error: ''
  },
  segmentAttributes: {
    marketing: [],
    membership: []
  },
  innerPermissions: {
    automaticFollowUpAction: false,
    followUpSegmentsAction: false
  },
  segmentLocations: [],
  segmentList: [],
  copyInProcess: {},
  popupAlert: ''
}

const reducer = (state = initialState, { type, payload }) => produce(state, draft => {
  switch (type) {
    case TYPES.FOLLOWUPS.GET:
      draft.loading = true
      draft.followups = []
      draft.error = ''
      break

    case TYPES.FOLLOWUPS.ERROR:
      draft.loading = false
      draft.error = payload
      draft.followups = []
      break

    case TYPES.FOLLOWUPS.SUCCESS:
      draft.loading = false
      draft.error = ''
      draft.followups = payload.followups
      draft.canEditSchedules = payload.canEditSchedules
      draft.canEditScripts = payload.canEditScripts
      break

    case TYPES.FOLLOWUPS.PERMISSION:
      draft.canEditSchedules = payload.canEditSchedules
      draft.canEditScripts = payload.canEditScripts
      break

    case TYPES.FOLLOWUPS.SET:
      draft.followups = payload
      break

    case TYPES.FOLLOWUPS.SET_INNER_PERMISSIONS:
      draft.innerPermissions = payload
      break

    case TYPES.TOUCHPOINT.OPEN:
      draft.touchpointCrud = {
        action: payload.action,
        data: payload.data
      }
      break

    case TYPES.TOUCHPOINT.CLOSE:
      draft.touchpointCrud = { action: '', data: {}, loading: false }
      break

    case TYPES.TOUCHPOINT.NEW:
      draft.touchpointCrud.loading = true
      break

    case TYPES.TOUCHPOINT.NEW_SUCCESS:
      draft.followups = payload
      draft.touchpointCrud.loading = false
      draft.snackbar = 'NEW_SUCCESS'
      break

    case TYPES.TOUCHPOINT.NEW_ERROR:
      draft.touchpointCrud.loading = false
      draft.touchpointCrud.error = payload
      break

    case TYPES.TOUCHPOINT.DELETE:
      draft.touchpointCrud.loading = true
      break

    case TYPES.TOUCHPOINT.DELETE_SUCCESS:
      draft.followups = payload
      draft.touchpointCrud.loading = false
      draft.snackbar = 'DELETE_SUCCESS'
      break

    case TYPES.TOUCHPOINT.DELETE_ERROR:
      draft.touchpointCrud.loading = false
      draft.touchpointCrud.error = payload
      break

    case TYPES.TOUCHPOINT.EDIT:
      draft.touchpointCrud.action = TP_OPTIONS.EDIT
      break

    case TYPES.TOUCHPOINT.EDIT_TOUCHPOINT:
      draft.touchpointCrud.loading = true
      break

    case TYPES.TOUCHPOINT.EDIT_SUCCESS:
      draft.followups = payload.followups
      draft.touchpointCrud.loading = false
      draft.snackbar = payload.snackbar
      break

    case TYPES.TOUCHPOINT.EDIT_ERROR:
      draft.touchpointCrud.loading = false
      draft.touchpointCrud.error = payload
      break

    case TYPES.SNACKBAR.CLOSE:
      draft.snackbar = ''
      break

    case TYPES.SNACKBAR.SET:
      draft.snackbar = payload
      break

    case TYPES.SCRIPTS.EDIT:
      draft.touchpointCrud = {
        action: payload.action,
        data: payload.data
      }
      break

    case TYPES.SCRIPTS.SAVE:
      draft.script = {
        data: payload.data
      }
      break

    case TYPES.SEGMENTS.SET:
      draft.segments = payload
      break

    case TYPES.SEGMENTS.SET_DATA:
      draft.segmentModalData.title = payload.title
      draft.segmentModalData.isOpen = true
      draft.segmentModalData.followUpType = payload.followUpType
      draft.segmentModalData.followUpStatus = payload.followUpStatus
      break

    case TYPES.SEGMENTS.SET_ATTRIBUTES:
      draft.segmentAttributes = payload
      break

    case TYPES.SEGMENTS.CLOSE:
      draft.segmentModalData.isOpen = false
      draft.segmentModalData.error = ''
      break

    case TYPES.SEGMENTS.ERROR:
      draft.segmentModalData.error = payload
      break

    case TYPES.SEGMENTS.SET_LOCATIONS:
      draft.segmentLocations = payload
      break

    case TYPES.SEGMENTS.SET_LIST:
      draft.segmentList = payload
      break

    case TYPES.SEGMENTS.SET_ALERT:
      draft.popupAlert = payload
      break

    case TYPES.SEGMENTS.SET_COPY_PROCESS:
      draft.copyInProcess = payload
      break
  }
})

export default reducer
