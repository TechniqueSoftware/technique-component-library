import { recordSaga } from '@redux/utils'
import { ACTIONS, key } from '../../redux'

import { apiCalls, formSubmission, getEmployees, watchGetUserData, watchScriptData } from '../../redux/sagas'

import {
  state,
  mockData,
  mockResponse
} from './mock'

const emptyAppointment = {
  contact: {
    value: {
      value: ''
    }
  },
  date: {
    value: ''
  },
  time: {
    value: {
      name: '',
      value: ''
    },
    error: '',
    validated: false
  }
}

describe('SAGAS', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('submissions', () => {
    const saga = formSubmission

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('submits a duplicate user', async () => {
      apiCalls.submit = jest.fn(() => Promise.reject(mockResponse.duplicateUser))

      const dispatched = await recordSaga({ saga, state })

      expect(dispatched.length).toBe(2)
      expect(apiCalls.submit).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.SUBMIT.RECEIVE_ERROR(mockResponse.duplicateUser)
      )
    })

    it('submits an error on the backend', async () => {
      apiCalls.submit = jest.fn(() => Promise.reject(mockResponse.backEndError))

      const dispatched = await recordSaga({ saga, state })

      expect(dispatched.length).toBe(2)
      expect(apiCalls.submit).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.SUBMIT.RECEIVE_ERROR(mockResponse.modifiedBackEndError)
      )
    })

    it('makes form submission without an appointment', async () => {
      apiCalls.submit = jest.fn(() => mockResponse.success)
      const dispatched = await recordSaga({ saga, state: emptyAppointment })

      expect(dispatched.length).toBe(1)
      expect(apiCalls.submit).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.SUBMIT.RECEIVE_SUCCESS(mockResponse.success)
      )
    })

    it('makes form submission with an appointment', async () => {
      apiCalls.submit = jest.fn(() => mockResponse.success)
      apiCalls.createAppointmentEvent = jest.fn(() => mockResponse.apptResponse)
      const updatedState = { ...state, [key]: { ...state[key], appointmentEnabled: true } }
      const dispatched = await recordSaga({ saga, state: updatedState })

      expect(dispatched.length).toBe(3)

      expect(apiCalls.submit).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.SUBMIT.RECEIVE_SUCCESS(mockResponse.success)
      )
    })
  })

  describe('get', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    const saga = watchGetUserData
    it('gets existing user data', async () => {
      apiCalls.getUserData = jest.fn(() => mockData.userResponse)
      const payload = { userId: 1 }

      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched.length).toBe(1)
      expect(apiCalls.getUserData).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.DATA.RECEIVE_USER_DATA(mockData.userResponse)
      )
    })
  })

  describe('update location', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    const saga = watchScriptData
    it('gets the script data', async () => {
      apiCalls.getScriptData = jest.fn(() => mockData.scriptData)

      const dispatched = await recordSaga({
        saga,
        state: {
          global: {
            user: {
              clubId: 659
            }
          },
          newPhoneInquiry: {
            form: {
              locationSelect: {
                value: {
                  name: 'Test',
                  value: 500
                }
              }
            }
          }
        }
      })

      expect(dispatched.length).toBe(1)
      expect(apiCalls.getScriptData).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(
        ACTIONS.DATA.RECEIVE_SCRIPT_DATA(mockData.scriptData.script)
      )
    })
  })

  describe('employees', () => {
    it('gets employees data', async () => {
      const saga = getEmployees
      apiCalls.getEmployeesAvailability = jest.fn(() => ({ users: mockData.employeesData }))
      apiCalls.getOwnAvailability = jest.fn(() => mockData.ownEmployeeData)

      const dispatched = await recordSaga({
        saga,
        state: {
          global: {
            user: {
              userId: 10,
              clubId: 659
            }
          },
          newPhoneInquiry: {
            form: {
              locationSelect: {
                value: {
                  name: 'Test',
                  value: 4585
                }
              },
              date: {
                value: '2022-10-12'
              }
            }
          }
        }
      })

      expect(dispatched.length).toBe(1)
      expect(apiCalls.getEmployeesAvailability).toHaveBeenCalledTimes(1)
      expect(apiCalls.getOwnAvailability).toHaveBeenCalledTimes(1)
      const employees = [mockData.ownEmployeeData].concat(mockData.employeesData.slice(1))
      const sortedEmployees = [...employees].sort((a, b) => a.firstName.localeCompare(b.firstName))
      expect(dispatched).toContainEqual(ACTIONS.DATA.RECEIVE_EMPLOYEES_DATA(sortedEmployees))
    })
  })
})
