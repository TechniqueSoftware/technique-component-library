import { produce } from 'immer'

import moment from 'moment-timezone'
import TYPES from './types'

export const initialState = {
  errors: [],
  appointmentEnabled: false,
  form: {
    locationSelect: {
      type: 'select',
      label: 'Location',
      value: {
        name: '',
        value: '',
        timeZone: ''
      },
      error: '',
      required: true,
      relatedField: null,
      validated: false
    },
    firstName: {
      type: 'text',
      label: 'First Name',
      value: '',
      error: '',
      required: true,
      relatedField: null,
      validated: false
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
      value: '',
      error: '',
      required: true,
      relatedField: null,
      validated: false
    },
    email: {
      type: 'email',
      label: 'Email',
      value: '',
      error: '',
      required: false,
      relatedField: 'mobilePhone',
      validated: false
    },
    mobilePhone: {
      type: 'phone',
      label: 'Phone',
      value: '',
      error: '',
      required: false,
      relatedField: 'email',
      validated: false
    },
    contact: {
      type: 'select',
      label: 'With',
      value: {
        name: '',
        value: '',
        availability: []
      },
      error: '',
      relatedField: null,
      validated: false
    },
    date: {
      type: 'date',
      label: 'Date',
      value: moment().format('YYYY-MM-DD'),
      error: '',
      relatedField: null,
      validated: false
    },
    time: {
      type: 'select',
      label: 'Time',
      value: {
        name: '',
        value: ''
      },
      error: '',
      relatedField: null,
      validated: false
    }
  },
  tiScript: {
    value: 'Loading...'
  },
  response: {}
}

const reducer = (state = initialState, { type, payload }) => produce(state, draft => {
  switch (type) {
    case TYPES.SUBMIT.SEND:
      draft.loading = true
      break
    case TYPES.SUBMIT.ERROR:
      draft.response = payload
      break
    case TYPES.SUBMIT.RECEIVE_SUCCESS:
      draft.loading = false
      draft.response = payload
      break
    case TYPES.SUBMIT.RECEIVE_ERROR:
      draft.loading = false
      draft.response = payload
      break

    case TYPES.DATA.SET:
      draft.form[payload.name] = { ...draft.form[payload.name], ...payload.data }
      break
    case TYPES.DATA.TOGGLE_APPOINTMENT:
      draft.appointmentEnabled = payload
      break

    case TYPES.DATA.CLEAR:
      draft.response = {}
      draft.appointmentEnabled = false
      draft.form = {
        ...initialState.form,
        locationSelect: draft.form.locationSelect,
        contact: draft.form.contact,
        date: draft.form.date,
        time: draft.form.time
      }
      break
    case TYPES.DATA.RECEIVE_USER_DATA:
      draft.response.user = payload
      break
    case TYPES.DATA.RECEIVE_EMPLOYEES_DATA:
      draft.locationEmployees = payload
      break
    case TYPES.DATA.RECEIVE_SCRIPT_DATA:
      draft.tiScript.value = payload
      break
  }
})

export default reducer
