import { TYPES, REDUCER } from '../../redux'

import { TP_OPTIONS } from '../../redux/constants'

import { followupsMock, segmentsMock } from './mock'

describe('REDUCER', () => {
  describe('Followups', () => {
    it('gets', () => {
      expect(REDUCER(undefined, { type: TYPES.FOLLOWUPS.GET })).toMatchSnapshot()
    })

    it('errors', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.FOLLOWUPS.ERROR,
          payload: 'some error here'
        })
      ).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.FOLLOWUPS.SUCCESS,
          payload: followupsMock.content[0]
        })
      ).toMatchSnapshot()
    })

    it('sets permission', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.FOLLOWUPS.PERMISSION,
          payload: {
            canEditSchedules: true,
            canEditScripts: false
          }
        })
      ).toMatchSnapshot()
    })

    it('sets', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.FOLLOWUPS.SET,
          payload: followupsMock.content[0]
        })
      ).toMatchSnapshot()
    })
  })

  describe('Touchpoints', () => {
    it('opens', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.OPEN,
          payload: { action: TP_OPTIONS.MENU, data: { b: 1 } }
        })
      ).toMatchSnapshot()
    })

    it('closes', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.CLOSE
        })
      ).toMatchSnapshot()
    })

    it('new', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.NEW,
          payload: { action: TP_OPTIONS.NEW, data: { a: 1 } }
        })
      ).toMatchSnapshot()
    })

    it('new success', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.NEW_SUCCESS,
          payload: { a: 1, b: 2 }
        })
      ).toMatchSnapshot()
    })

    it('new error', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.NEW_ERROR,
          payload: 'There has been an error'
        })
      ).toMatchSnapshot()
    })

    it('edit', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.EDIT
        })
      ).toMatchSnapshot()
    })

    it('edit touchpoint', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.EDIT_TOUCHPOINT
        })
      ).toMatchSnapshot()
    })

    it('edit touchpoint success', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.EDIT_SUCCESS,
          payload: { followups: [], snackbar: 'EDIT_SUCCESS' }
        })
      ).toMatchSnapshot()
    })

    it('edit error', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.EDIT_ERROR,
          payload: 'There has been an error'
        })
      ).toMatchSnapshot()
    })

    it('delete', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.DELETE
        })
      ).toMatchSnapshot()
    })

    it('delete success', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.DELETE_SUCCESS,
          payload: { a: 1, b: 2 }
        })
      ).toMatchSnapshot()
    })

    it('delete error', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.TOUCHPOINT.DELETE_ERROR,
          payload: 'There has been an error'
        })
      ).toMatchSnapshot()
    })
  })

  describe('Inner permissions', () => {
    it('sets inner permissions', () => {
      expect(REDUCER(undefined, {
        type: TYPES.FOLLOWUPS.SET_INNER_PERMISSIONS,
        payload: { automaticFollowUpAction: false, followUpSegmentsAction: true }
      })
      ).toMatchSnapshot()
    })
  })

  describe('Scripts', () => {
    it('Edit Scripts open', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SCRIPTS.EDIT,
          payload: { a: 1, b: 2 }
        })
      ).toMatchSnapshot()
    })

    it('Save Scripts ', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SCRIPTS.SAVE,
          payload: { a: 1, b: 2 }
        })
      ).toMatchSnapshot()
    })
  })

  describe('Snackbar', () => {
    it('sets snackbar', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SNACKBAR.SET,
          payload: 'Snackbar Msg'
        })
      ).toMatchSnapshot()
    })

    it('closes snackbar', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SNACKBAR.CLOSE
        })
      ).toMatchSnapshot()
    })
  })

  describe('Segments', () => {
    it('sets segments', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SEGMENTS.SET,
          payload: segmentsMock
        })
      ).toMatchSnapshot()
    })

    it('sets segment attributes', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SEGMENTS.SET_ATTRIBUTES,
          payload: { marketing: ['a'], membership: ['b'] }
        })
      ).toMatchSnapshot()
    })

    it('sets segment data', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SEGMENTS.SET_DATA,
          payload: { title: 'title', followUpType: 1, followUpStatus: '11' }
        })
      ).toMatchSnapshot()
    })

    it('closes segment modal', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SEGMENTS.CLOSE
        })
      ).toMatchSnapshot()
    })

    it('sets segment error', () => {
      expect(
        REDUCER(undefined, {
          type: TYPES.SEGMENTS.ERROR,
          payload: 'Some error here'
        })
      ).toMatchSnapshot()
    })
  })
})
