import { GLOBAL_SELECTOR } from '..'

import { state } from './mock'

describe('SELECTORS', () => {
  it('gets loading', () => {
    expect(GLOBAL_SELECTOR.LOADING(state)).toMatchSnapshot()
  })

  it('gets error', () => {
    expect(GLOBAL_SELECTOR.ERROR(state)).toMatchSnapshot()
  })

  it('gets user', () => {
    expect(GLOBAL_SELECTOR.USER(state)).toMatchSnapshot()
  })

  it('gets club', () => {
    expect(GLOBAL_SELECTOR.CLUB(state)).toMatchSnapshot()
  })

  it('gets locations', () => {
    expect(GLOBAL_SELECTOR.LOCATIONS(state)).toMatchSnapshot()
  })

  it('gets selected location', () => {
    expect(GLOBAL_SELECTOR.SELECTED_LOCATION(state)).toMatchSnapshot()
  })
})
