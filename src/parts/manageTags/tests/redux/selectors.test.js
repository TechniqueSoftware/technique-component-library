import { SELECTORS } from '../../redux'

import { state } from './mock'

describe('SELECTORS', () => {
  it('get tags', () => {
    expect(SELECTORS.TAGS(state)).toMatchSnapshot()
  })
})
