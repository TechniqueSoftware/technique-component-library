import { GLOBAL_ACTIONS } from '..'

describe('GLOBAL ACTIONS', () => {
  describe('Loading', () => {
    it('finishes', () => {
      expect(GLOBAL_ACTIONS.LOADING.FINISHED()).toMatchSnapshot()
    })
  })

  describe('User', () => {
    it('sets', () => {
      expect(GLOBAL_ACTIONS.USER.SET_LOGGED_IN({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('gets', () => {
      expect(GLOBAL_ACTIONS.USER.GET({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(GLOBAL_ACTIONS.USER.SUCCESS({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('errors', () => {
      expect(GLOBAL_ACTIONS.USER.ERROR({
        error: 'some error here'
      })).toMatchSnapshot()
    })

    it('clears', () => {
      expect(GLOBAL_ACTIONS.USER.CLEAR()).toMatchSnapshot()
    })
  })

  describe('Club', () => {
    it('sets', () => {
      expect(GLOBAL_ACTIONS.CLUB.SET({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('gets', () => {
      expect(GLOBAL_ACTIONS.CLUB.GET({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(GLOBAL_ACTIONS.CLUB.SUCCESS({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('errors', () => {
      expect(GLOBAL_ACTIONS.CLUB.ERROR({
        error: 'some error here'
      })).toMatchSnapshot()
    })

    it('clears', () => {
      expect(GLOBAL_ACTIONS.CLUB.CLEAR()).toMatchSnapshot()
    })
  })

  describe('Location', () => {
    it('sets', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.SET_ALL({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('gets', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.GET({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.SUCCESS({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('errors', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.ERROR({
        error: 'some error here'
      })).toMatchSnapshot()
    })

    it('clears', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.CLEAR()).toMatchSnapshot()
    })

    it('selects', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.SELECT({
        data: { clubId: undefined, locationId: 1974 }
      })).toMatchSnapshot()
    })

    it('sets', () => {
      expect(GLOBAL_ACTIONS.LOCATIONS.SET({
        data: { name: 'Valhalla', value: '1' }
      })).toMatchSnapshot()
    })
  })

  describe('Data', () => {
    it('gets', () => {
      expect(GLOBAL_ACTIONS.DATA.GET({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('succeeds', () => {
      expect(GLOBAL_ACTIONS.DATA.SUCCESS({
        data: 'some data here'
      })).toMatchSnapshot()
    })

    it('errors', () => {
      expect(GLOBAL_ACTIONS.DATA.ERROR({
        error: 'some error here'
      })).toMatchSnapshot()
    })

    it('clears', () => {
      expect(GLOBAL_ACTIONS.DATA.CLEAR()).toMatchSnapshot()
    })
  })
})
