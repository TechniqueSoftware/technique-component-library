import { ACTIONS } from '../../redux'

import { mockData, mockResponse } from './mock'

describe('ACTIONS', () => {
  describe('SUBMIT ACTIONS', () => {
    it('Successful Submission', () => {
      expect(ACTIONS.SUBMIT.SEND()).toMatchSnapshot()
    })
    it('Invalid Submission', () => {
      expect(ACTIONS.SUBMIT.ERROR(mockResponse.localError)).toMatchSnapshot()
    })
    it('Successful Submission', () => {
      expect(ACTIONS.SUBMIT.RECEIVE_SUCCESS(mockResponse.success)).toMatchSnapshot()
    })
    it('Submission Error', () => {
      expect(ACTIONS.SUBMIT.RECEIVE_ERROR(mockResponse.backEndError)).toMatchSnapshot()
    })
  })

  describe('DATA ACTIONS', () => {
    it('Set Value', () => {
      expect(ACTIONS.DATA.SET(mockData.field)).toMatchSnapshot()
    })
    it('Clear Data', () => {
      expect(ACTIONS.DATA.CLEAR()).toMatchSnapshot()
    })
    it('Request User Data', () => {
      expect(ACTIONS.DATA.REQUEST_USER_DATA(mockData.existingUser)).toMatchSnapshot()
    })
    it('Receive User Data', () => {
      expect(ACTIONS.DATA.REQUEST_USER_DATA(mockData.userResponse)).toMatchSnapshot()
    })
  })
})
