import TYPES from './types'

const FOLLOWUPS_ACTIONS = {
  GET: () => ({ type: TYPES.FOLLOWUPS.GET }),
  ERROR: payload => ({ type: TYPES.FOLLOWUPS.ERROR, payload }),
  SUCCESS: payload => ({ type: TYPES.FOLLOWUPS.SUCCESS, payload }),
  PERMISSION: payload => ({ type: TYPES.FOLLOWUPS.PERMISSION, payload }),
  SET: payload => ({ type: TYPES.FOLLOWUPS.SET, payload }),
  INNER_PERMISSIONS: payload => ({ type: TYPES.FOLLOWUPS.INNER_PERMISSIONS, payload }),
  SET_INNER_PERMISSIONS: payload => ({ type: TYPES.FOLLOWUPS.SET_INNER_PERMISSIONS, payload }),
  GET_FEATURE_PERMISSIONS: payload => ({ type: TYPES.FOLLOWUPS.GET_FEATURE_PERMISSIONS, payload })
}

const TOUCHPOINT_ACTIONS = {
  OPEN: payload => ({ type: TYPES.TOUCHPOINT.OPEN, payload }),
  EDIT: payload => ({ type: TYPES.TOUCHPOINT.EDIT, payload }),
  EDIT_TOUCHPOINT: payload => ({ type: TYPES.TOUCHPOINT.EDIT_TOUCHPOINT, payload }),
  EDIT_SUCCESS: payload => ({ type: TYPES.TOUCHPOINT.EDIT_SUCCESS, payload }),
  EDIT_ERROR: payload => ({ type: TYPES.TOUCHPOINT.EDIT_ERROR, payload }),
  NEW: payload => ({ type: TYPES.TOUCHPOINT.NEW, payload }),
  NEW_SUCCESS: payload => ({ type: TYPES.TOUCHPOINT.NEW_SUCCESS, payload }),
  NEW_ERROR: payload => ({ type: TYPES.TOUCHPOINT.NEW_ERROR, payload }),
  DELETE: payload => ({ type: TYPES.TOUCHPOINT.DELETE, payload }),
  DELETE_SUCCESS: payload => ({ type: TYPES.TOUCHPOINT.DELETE_SUCCESS, payload }),
  DELETE_ERROR: payload => ({ type: TYPES.TOUCHPOINT.DELETE_ERROR, payload }),
  CLOSE: () => ({ type: TYPES.TOUCHPOINT.CLOSE })
}

const SCRIPT_ACTIONS = {
  GET: () => ({ type: TYPES.SCRIPTS.GET }),
  SAVE: payload => ({ type: TYPES.SCRIPTS.SAVE, payload }),
  EDIT: payload => ({ type: TYPES.SCRIPTS.EDIT, payload })
}

const SEGMENTS_ACTIONS = {
  CLOSE: () => ({ type: TYPES.SEGMENTS.CLOSE }),
  GET: payload => ({ type: TYPES.SEGMENTS.GET, payload }),
  SET: payload => ({ type: TYPES.SEGMENTS.SET, payload }),
  GET_ATTRIBUTES: () => ({ type: TYPES.SEGMENTS.GET_ATTRIBUTES }),
  SET_ATTRIBUTES: payload => ({ type: TYPES.SEGMENTS.SET_ATTRIBUTES, payload }),
  SET_DATA: payload => (({ type: TYPES.SEGMENTS.SET_DATA, payload })),
  SAVE: payload => ({ type: TYPES.SEGMENTS.SAVE, payload }),
  DELETE: payload => ({ type: TYPES.SEGMENTS.DELETE, payload }),
  GET_LOCATIONS: () => ({ type: TYPES.SEGMENTS.GET_LOCATIONS }),
  SET_LOCATIONS: payload => ({ type: TYPES.SEGMENTS.SET_LOCATIONS, payload }),
  GET_LIST: payload => ({ type: TYPES.SEGMENTS.GET_LIST, payload }),
  SET_LIST: payload => ({ type: TYPES.SEGMENTS.SET_LIST, payload }),
  GET_COPY_PROCESS: payload => ({ type: TYPES.SEGMENTS.GET_COPY_PROCESS, payload }),
  SET_COPY_PROCESS: payload => ({ type: TYPES.SEGMENTS.SET_COPY_PROCESS, payload }),
  SET_ALERT: payload => ({ type: TYPES.SEGMENTS.SET_ALERT, payload }),
  ERROR: payload => ({ type: TYPES.SEGMENTS.ERROR, payload })
}

const SNACKBAR_ACTIONS = {
  CLOSE: () => ({ type: TYPES.SNACKBAR.CLOSE }),
  SET: payload => ({ type: TYPES.SNACKBAR.SET, payload })
}

export default {
  FOLLOWUPS: FOLLOWUPS_ACTIONS,
  TOUCHPOINT: TOUCHPOINT_ACTIONS,
  SCRIPTS: SCRIPT_ACTIONS,
  SEGMENTS: SEGMENTS_ACTIONS,
  SNACKBAR: SNACKBAR_ACTIONS
}
