import { ACTIONS } from '../../redux'

import { mockData } from './mock'

describe('ACTIONS', () => {
  describe('DATA ACTIONS', () => {
    it('Set Value', () => {
      expect(ACTIONS.DATA.SET(mockData.tags)).toMatchSnapshot()
    })
    it('Request tags', () => {
      expect(ACTIONS.DATA.REQUEST_TAGS(mockData.tags)).toMatchSnapshot()
    })
    it('Receive Save tags', () => {
      expect(ACTIONS.DATA.SAVE_TAGS(mockData.location, 'new tags')).toMatchSnapshot()
    })
  })
})
