import TYPES from './types'

const SUBMIT_ACTIONS = {
  SEND: () => ({ type: TYPES.SUBMIT.SEND }),
  ERROR: payload => ({ type: TYPES.SUBMIT.ERROR, payload }),

  RECEIVE_SUCCESS: payload => ({ type: TYPES.SUBMIT.RECEIVE_SUCCESS, payload }),
  RECEIVE_ERROR: payload => ({ type: TYPES.SUBMIT.RECEIVE_ERROR, payload }),

  RECEIVE_APPT_SUCCESS: payload => ({ type: TYPES.SUBMIT.RECEIVE_APPT_SUCCESS, payload }),
  RECEIVE_APPT_ERROR: payload => ({ type: TYPES.SUBMIT.RECEIVE_APPT_ERROR, payload })
}

const DATA_ACTIONS = {
  SET: payload => ({ type: TYPES.DATA.SET, payload }),
  TOGGLE_APPOINTMENT: payload => ({ type: TYPES.DATA.TOGGLE_APPOINTMENT, payload }),

  CLEAR: () => ({ type: TYPES.DATA.CLEAR }),
  REQUEST_USER_DATA: payload => ({ type: TYPES.DATA.REQUEST_USER_DATA, payload }),
  RECEIVE_USER_DATA: payload => ({ type: TYPES.DATA.RECEIVE_USER_DATA, payload }),

  REQUEST_EMPLOYEES_DATA: payload => ({ type: TYPES.DATA.REQUEST_EMPLOYEES_DATA, payload }),
  RECEIVE_EMPLOYEES_DATA: payload => ({ type: TYPES.DATA.RECEIVE_EMPLOYEES_DATA, payload }),

  REQUEST_SCRIPT_DATA: payload => ({ type: TYPES.DATA.REQUEST_SCRIPT_DATA, payload }),
  RECEIVE_SCRIPT_DATA: payload => ({ type: TYPES.DATA.RECEIVE_SCRIPT_DATA, payload }),

  SELECT_LOCATION: payload => ({ type: TYPES.DATA.SELECT_LOCATION, payload })
}

export default {
  SUBMIT: SUBMIT_ACTIONS,
  DATA: DATA_ACTIONS
}
