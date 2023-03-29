import { SELECTORS } from '../../redux'

import { state } from './mock'

describe('SELECTORS', () => {
  it('loading', () => {
    expect(SELECTORS.LOADING(state)).toMatchSnapshot()
  })

  it('error', () => {
    expect(SELECTORS.ERROR(state)).toMatchSnapshot()
  })

  it('followups', () => {
    expect(SELECTORS.FOLLOWUPS(state)).toMatchSnapshot()
  })

  it('touchpointCrud', () => {
    expect(SELECTORS.TOUCHPOINT_CRUD(state)).toMatchSnapshot()
  })

  it('canEditScripts', () => {
    expect(SELECTORS.CAN_EDIT_SCRIPTS(state)).toMatchSnapshot()
  })

  it('canEditSchedules', () => {
    expect(SELECTORS.CAN_EDIT_SCHEDULES(state)).toMatchSnapshot()
  })

  it('getStatus', () => {
    expect(SELECTORS.STATUS(state, { followUpType: 'followup', followUpStatus: '1' })).toMatchSnapshot()
  })

  it('segments', () => {
    expect(SELECTORS.SEGMENTS(state)).toMatchSnapshot()
  })

  it('segmentAttributes', () => {
    expect(SELECTORS.SEGMENT_ATTRIBUTES(state)).toMatchSnapshot()
  })
})
