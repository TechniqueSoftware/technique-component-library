import { TYPES, REDUCER } from '../../redux'

import {
  mockData
} from './mock'

describe('REDUCER', () => {
  describe('Data', () => {
    it('sets data in a field', () => {
      expect(
        REDUCER(undefined, { type: TYPES.DATA.SET, payload: mockData })
      ).toMatchSnapshot()
    })
  })
})
