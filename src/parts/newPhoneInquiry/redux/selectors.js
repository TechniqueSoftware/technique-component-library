import { createSelector } from 'reselect'
import { get } from 'lodash'

import { key } from './types'
import { initialState } from './reducer'

const reducer = state => get(state, key, initialState)

const getFormResponse = createSelector(
  reducer, state => get(state, 'response', {})
)

const getForm = createSelector(
  reducer, state => get(state, 'form', initialState.form)
)

const getConstants = createSelector(
  reducer, state => get(state, 'constants', initialState.formConstants)
)

const getScriptData = createSelector(
  reducer, state => get(state, 'tiScript[value]', '')
)

const getEmployees = createSelector(
  reducer, state => get(state, 'locationEmployees', [])
)

const getAppointment = createSelector(reducer, state => {
  const form = get(state, 'form', initialState.form)
  return { contact: form.contact, date: form.date, time: form.time }
})

const getAppointmentEnabled = createSelector(
  reducer, state => get(state, 'appointmentEnabled', false)
)

const getSelectedLocation = createSelector(
  reducer, state => get(state, 'form[locationSelect]', initialState.form.locationSelect)
)

export default {
  FORM_RESPONSE: getFormResponse,
  FORM_DATA: getForm,
  FORM_CONSTANTS: getConstants,
  SCRIPT: getScriptData,
  EMPLOYEES: getEmployees,
  APPOINTMENT: getAppointment,
  APPOINTMENT_ENABLED: getAppointmentEnabled,
  SELECTED_LOCATION: getSelectedLocation
}
