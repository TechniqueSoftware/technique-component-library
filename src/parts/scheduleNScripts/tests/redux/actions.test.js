import { ACTIONS } from '../../redux'

import { followupsMock, segmentsMock, locationIdMock, permissionMock } from './mock'

describe('ACTIONS', () => {
  describe('Followups', () => {
    it('gets', () => { expect(ACTIONS.FOLLOWUPS.GET()).toMatchSnapshot() })

    it('errors', () => {
      expect(ACTIONS.FOLLOWUPS.ERROR({
        error: 'some error here'
      })).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(ACTIONS.FOLLOWUPS.SUCCESS(followupsMock)).toMatchSnapshot()
    })

    it('sets permission', () => {
      expect(ACTIONS.FOLLOWUPS.PERMISSION({
        canEditSchedules: true,
        canEditScripts: false
      })).toMatchSnapshot()
    })

    it('sets', () => {
      expect(ACTIONS.FOLLOWUPS.SET(followupsMock)).toMatchSnapshot()
    })

    it('gets inner permissions', () => {
      expect(ACTIONS.FOLLOWUPS.INNER_PERMISSIONS(locationIdMock)).toMatchSnapshot()
    })

    it('sets inner permissions', () => {
      expect(ACTIONS.FOLLOWUPS.SET_INNER_PERMISSIONS(permissionMock)).toMatchSnapshot()
    })
  })

  describe('Touchpoint', () => {
    it('opens', () => {
      expect(ACTIONS.TOUCHPOINT.OPEN({
        payload: 'some id here'
      })).toMatchSnapshot()
    })

    it('edits', () => {
      expect(ACTIONS.TOUCHPOINT.EDIT({
        payload: 'some id here'
      })).toMatchSnapshot()
    })

    it('edits schedule', () => {
      expect(ACTIONS.TOUCHPOINT.EDIT_TOUCHPOINT({
        payload: { dayNum: 2, immediate: false }
      })).toMatchSnapshot()
    })

    it('edits errors', () => {
      expect(ACTIONS.TOUCHPOINT.EDIT_ERROR({
        payload: 'some error here'
      })).toMatchSnapshot()
    })

    it('edits succeeds', () => {
      expect(ACTIONS.TOUCHPOINT.EDIT_SUCCESS({
        payload: { followups: [], snackbar: 'EDIT_SUCCESS' }
      })).toMatchSnapshot()
    })

    it('creates', () => {
      expect(ACTIONS.TOUCHPOINT.NEW({
        payload: 'some id here'
      })).toMatchSnapshot()
    })

    it('creates errors', () => {
      expect(ACTIONS.TOUCHPOINT.NEW_ERROR({
        payload: 'some error here'
      })).toMatchSnapshot()
    })

    it('creates succeeds', () => {
      expect(ACTIONS.TOUCHPOINT.NEW_SUCCESS({
        payload: 'some id here'
      })).toMatchSnapshot()
    })

    it('deletes', () => {
      expect(ACTIONS.TOUCHPOINT.DELETE({
        payload: 'some id here'
      })).toMatchSnapshot()
    })

    it('deletes errors', () => {
      expect(ACTIONS.TOUCHPOINT.DELETE_ERROR({
        payload: 'some error here'
      })).toMatchSnapshot()
    })

    it('deletes succeeds', () => {
      expect(ACTIONS.TOUCHPOINT.DELETE_SUCCESS({
        payload: [{ a: 1 }, { a: 2 }]
      })).toMatchSnapshot()
    })

    it('closes', () => {
      expect(ACTIONS.TOUCHPOINT.CLOSE()).toMatchSnapshot()
    })
  })

  describe('Snackbar', () => {
    it('closes snackbar', () => {
      expect(ACTIONS.SNACKBAR.CLOSE()).toMatchSnapshot()
    })

    it('sets snackbar', () => {
      expect(ACTIONS.SNACKBAR.SET({ payload: 'Snackbar msg' })).toMatchSnapshot()
    })
  })

  describe('Scripts', () => {
    it('edits', () => {
      expect(
        ACTIONS.SCRIPTS.EDIT({
          payload: { action: 'some action', data: {} }
        })
      ).toMatchSnapshot()
    })

    it('saves', () => {
      expect(
        ACTIONS.SCRIPTS.SAVE({
          payload: { data: {} }
        })
      ).toMatchSnapshot()
    })
  })

  describe('Segments', () => {
    it('sets segments', () => {
      expect(ACTIONS.SEGMENTS.SET(segmentsMock)).toMatchSnapshot()
    })

    it('sets segments data', () => {
      expect(ACTIONS.SEGMENTS.SET_DATA({ title: 'title', followUpType: 1, followUpStatus: '11' })).toMatchSnapshot()
    })

    it('sets segments attributes', () => {
      expect(ACTIONS.SEGMENTS.SET_ATTRIBUTES({ marketing: ['a'], membership: ['b'] })).toMatchSnapshot()
    })

    it('closes segments modal', () => {
      expect(ACTIONS.SEGMENTS.CLOSE()).toMatchSnapshot()
    })

    it('sets error', () => {
      expect(ACTIONS.SEGMENTS.ERROR('Some error here')).toMatchSnapshot()
    })
  })
})
