import { recordSaga } from '@redux/utils'

import { apiCalls, getTags, saveTags } from '../../redux/sagas'

import {
  state,
  mockData,
  mockResponse
} from './mock'

describe('SAGAS', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Save Tags', () => {
    const saga = saveTags

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('submits a new tag', async () => {
      apiCalls.saveTags = jest.fn(() => Promise.resolve(mockResponse.success))
      const payload = {
        newTagValue: 'New tag'
      }
      const dispatched = await recordSaga({ saga, payload, state })
      expect(dispatched.length).toBe(1)
      expect(apiCalls.saveTags).toHaveBeenCalledTimes(1)
    })

    describe('get', () => {
      afterEach(() => {
        jest.clearAllMocks()
      })

      const saga = getTags
      it('gets All Tags of club', async () => {
        apiCalls.getTemplateTags = jest.fn(() => mockData.tags)
        const dispatched = await recordSaga({ saga, state })

        expect(dispatched.length).toBe(1)
        expect(apiCalls.getTemplateTags).toHaveBeenCalledTimes(1)
      })
    })
  })
})
