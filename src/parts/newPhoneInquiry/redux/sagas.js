import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from '@axios'
import moment from 'moment-timezone'

import { GLOBAL_SELECTOR } from '@redux/global'

import SELECTORS from './selectors'
import ACTIONS from './actions'
import TYPES from './types'

const formatAppointmentTime = (time, timeZone) => {
  if (!time.value?.value) return [null, null]
  const utcStart = moment.tz(time.value.value, timeZone).utc().format()
  const date = new Date(utcStart)
  const utcEnd = new Date(date.getTime() + 30 * 60000).toISOString()
  return [utcStart, utcEnd]
}

const formatFormData = formData => Object.keys(formData).reduce((obj, key) => {
  if (!['locationSelect'].includes(key)) return { ...obj, [key]: formData[key].value }
  return obj
}, {})

const simplifyErrorStructure = err => {
  if (err.status === 400) return { status: err.status, code: err.code, user: err.user }
  if (err.status === 'BAD_REQUEST') {
    let message = ''
    if (err.messages.code.includes('DATA TOO LONG')) {
      if (err.messages.code.includes('FIRST_NAME')) message = 'First name cannot exceed 50 characters'
      if (err.messages.code.includes('LAST_NAME')) message = 'Last name cannot exceed 50 characters'
    }
    return { status: 400, code: err.status, error: err.error, message }
  }
}

export const apiCalls = {
  submit: formBody => axios.post('/users', formBody),
  getUserData: userId => axios.get(`/users/${userId}?limited=true`),
  getLocationData: locationId => axios.get(`/locations/?locationId=${locationId}`),
  getScriptData: locationId => axios.get(`/settings/ti-script/${locationId}`),
  getEmployeesAvailability: ({ locationId, params }) => axios.get(`/locations/${locationId}/availability?eventTypeId=0&eventTypeId=4`, { params }), // eslint-disable-line max-len
  getOwnAvailability: ({ userId, params }) => axios.get(`/users/${userId}/availability?eventTypeId=0&eventTypeId=4`, { params }), // eslint-disable-line max-len
  createAppointmentEvent: appointmentBody => axios.post('/events', appointmentBody)
}

export function* watchGetUserData (action) {
  try {
    if (!action?.payload) throw new Error('There is no user')
    const userData = yield call(apiCalls.getUserData, action.payload)
    yield put(ACTIONS.DATA.RECEIVE_USER_DATA(userData))
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}

export function* formSubmission () {
  try {
    const user = yield select(GLOBAL_SELECTOR.USER)
    const selectedLocation = yield select(SELECTORS.SELECTED_LOCATION)
    const formData = yield select(SELECTORS.FORM_DATA)
    const appointment = yield select(SELECTORS.APPOINTMENT)
    const appointmentEnabled = yield select(SELECTORS.APPOINTMENT_ENABLED)

    const updatedFormData = appointmentEnabled
      ? formData
      : {
        ...formData,
        contact: {
          value: {
            value: user.userId,
            name: `${user.firstName} ${user.lastName}`
          }
        }
      }

    const userBody = {
      ...formatFormData(updatedFormData),
      locationId: selectedLocation?.value?.value,
      salespersonId: appointmentEnabled ? appointment?.contact?.value.value : user.userId,
      clubId: user.clubId,
      gender: 'M',
      role: { id: 99, name: 'Prospect' },
      source: 'T.I.',
      userOrigin: {
        originId: 2,
        originName: 'T.I.'
      },
      sendResponseEmails: false,
      smsOptOut: true,
      emailOptOut: false
    }

    const data = yield call(apiCalls.submit, JSON.stringify(userBody))
    data.status = 202
    data.code = 'SUCCESS'

    if (appointmentEnabled) {
      const { timeZone, value } = selectedLocation.value
      const [startTime, endTime] = formatAppointmentTime(appointment.time, timeZone)
      const appointmentBody = {
        clubId: user.clubId,
        locationId: value,
        eventTypeId: 4,
        eventOwnerId: appointment?.contact?.value.value,
        startTime,
        endTime,
        subject: null,
        createdById: user.userId,
        remindAttendee: true,
        remindOwner: true,
        bookingSource: 'Club OS T.I. Form',
        attendee: [
          {
            attendeeId: data.userId,
            attendeeStatus: 'A',
            visitType: 'A'
          }
        ]
      }

      const appointmentResponse = yield call(apiCalls.createAppointmentEvent, JSON.stringify(appointmentBody))

      yield put(ACTIONS.SUBMIT.RECEIVE_APPT_SUCCESS(appointmentResponse))
      yield put(ACTIONS.DATA.CLEAR())
    }
    yield put(ACTIONS.SUBMIT.RECEIVE_SUCCESS(data))
  } catch (err) {
    const modifiedError = simplifyErrorStructure(err)

    yield put(ACTIONS.SUBMIT.RECEIVE_ERROR(modifiedError))
    yield put(ACTIONS.SUBMIT.RECEIVE_APPT_ERROR(modifiedError))
  }
}

export function* selectLocation ({ payload }) {
  try {
    const { name, error, validated, value } = payload
    const locationId = value.value
    const dataResponse = yield call(apiCalls.getLocationData, locationId)
    const timeZone = dataResponse?.content[0]?.timeZone
    yield put(
      ACTIONS.DATA.SET({
        name,
        data: { value: { ...value, timeZone }, error, validated }
      })
    )
  } catch (err) {
    return null
  }
}

export function* watchScriptData () {
  try {
    const { value } = yield select(SELECTORS.SELECTED_LOCATION)
    const locationId = value.value

    if (locationId) {
      const scriptData = yield call(apiCalls.getScriptData, locationId)
      yield put(ACTIONS.DATA.RECEIVE_SCRIPT_DATA(scriptData?.script))
    }
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}

export function* getEmployees () {
  try {
    const selectedLocation = yield select(SELECTORS.SELECTED_LOCATION)
    const { date } = yield select(SELECTORS.APPOINTMENT)
    const { userId } = yield select(GLOBAL_SELECTOR.USER)
    const { value: { value, timeZone } } = selectedLocation
    const locationId = value
    const offset = moment.tz(timeZone).format('Z')
    const params = {
      availabilityDuration: 30,
      startTimeStart: `${date.value}T00:00:00.${offset}`,
      startTimeEnd: `${date.value}T23:45:00.${offset}`,
      multiBookingEventTypeId: 4
    }
    const employeesParams = {
      ...params,
      status: 'available'
    }
    const ownParams = {
      ...params,
      locationId,
      applyBookingThreshold: false
    }
    const employeesRes = yield call(apiCalls.getEmployeesAvailability, { locationId, params: employeesParams })
    const ownAvailabilityRes = yield call(apiCalls.getOwnAvailability, { userId, params: ownParams })
    const users = employeesRes.users.reduce((acc, user) => {
      if (user.userId === userId) return acc.concat(ownAvailabilityRes)
      if (!user.availability.length) return acc
      return acc.concat(user)
    }, [])

    const sortedUsers = [...users].sort((a, b) => a.firstName.localeCompare(b.firstName))
    yield put(ACTIONS.DATA.RECEIVE_EMPLOYEES_DATA(sortedUsers))
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}

export default function* saga () {
  yield takeEvery(TYPES.DATA.REQUEST_USER_DATA, watchGetUserData)
  yield takeLatest(TYPES.SUBMIT.SEND, formSubmission)
  yield takeLatest(TYPES.DATA.SELECT_LOCATION, selectLocation)
  yield takeLatest(TYPES.DATA.REQUEST_SCRIPT_DATA, watchScriptData)
  yield takeLatest(TYPES.DATA.REQUEST_EMPLOYEES_DATA, getEmployees)
}
