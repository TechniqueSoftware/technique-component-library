import { TYPES, REDUCER } from '../../redux'

import {
  mockData,
  mockResponse
} from './mock'

// Required in order not to update snapshots when day changes
jest.mock('moment-timezone', () => () => ({
  format: () => '2013-19-06'
}))

describe('REDUCER', () => {
  describe('Data', () => {
    it('sets data in a field', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.SET, payload: mockData.field })
      ).toMatchSnapshot()
    })
    it('clears the data', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.CLEAR, payload: mockData.locationReset })
      ).toMatchSnapshot()
    })
    it('receives an existing user\'s data', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.REQUEST_USER_DATA, payload: mockData.existingUser })
      ).toMatchSnapshot()
    })
    it('receives the user data', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.RECEIVE_USER_DATA, payload: mockData.userResponse })
      ).toMatchSnapshot()
    })
  })

  describe('Submissions', () => {
    it('posts data', () => {
      expect(REDUCER(undefined, { type: TYPES.SUBMIT.SEND })).toMatchSnapshot()
    })
    it('has an invalid submission value', () => {
      expect(REDUCER(undefined, { type: TYPES.SUBMIT.ERROR, payload: mockResponse.localError })).toMatchSnapshot()
    })
    it('receives a successful response', () => {
      expect(
        REDUCER(undefined, { type: TYPES.SUBMIT.RECEIVE_SUCCESS, payload: mockResponse.success })
      ).toMatchSnapshot()
    })
    it('receives an error response', () => {
      expect(
        REDUCER(undefined, { type: TYPES.SUBMIT.RECEIVE_ERROR, payload: mockResponse.backEndError })
      ).toMatchSnapshot()
    })
  })

  describe('Location', () => {
    it('sets data', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.RECEIVE_SCRIPT_DATA, payload: mockData.scriptData })
      ).toMatchSnapshot()
    })
  })

  describe('Employees', () => {
    it('sets data', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.RECEIVE_EMPLOYEES_DATA, payload: mockData.employeesData })
      ).toMatchSnapshot()
    })
  })
})
