import { SELECTORS } from '../../redux'

import { state } from './mock'

describe('SELECTORS', () => {
  it('get form', () => {
    expect(SELECTORS.FORM_DATA(state)).toMatchSnapshot()
  })
  it('get form response', () => {
    expect(SELECTORS.FORM_RESPONSE(state)).toMatchSnapshot()
  })
})
