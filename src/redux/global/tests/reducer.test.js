import { TYPES, GLOBAL_REDUCER } from '..'

describe('GLOBAL REDUCER', () => {
  describe('Data', () => {
    it('gets data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.DATA.GET
      })).toMatchSnapshot()
    })

    it('throws error getting data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.DATA.ERROR,
        payload: 'This thing blew up'
      })).toMatchSnapshot()
    })

    it('finished loading data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.DATA.SUCCESS
      })).toMatchSnapshot()
    })
  })
  describe('User', () => {
    it('sets user data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.USER.SET_LOGGED_IN,
        payload: { id: 1, name: 'Adam Ondra' }
      })).toMatchSnapshot()
    })

    it('sets delegated user data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.USER.SET_DELEGATED,
        payload: { id: 10, name: 'Steph Curry' }
      })).toMatchSnapshot()
    })
  })

  describe('Club', () => {
    it('sets club data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.CLUB.SET,
        payload: { id: 1, name: 'No mere mortals here' }
      })).toMatchSnapshot()
    })
  })

  describe('Locations', () => {
    it('sets location data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.LOCATIONS.SET_ALL,
        payload: [
          { id: 1, name: 'Valhalla' },
          { id: 2, name: 'The Pit' }
        ]
      })).toMatchSnapshot()
    })

    it('selects location', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.LOCATIONS.SELECT,
        payload: { clubId: undefined, locationId: 4559 }
      })).toMatchSnapshot()
    })

    it('sets location', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.LOCATIONS.SET,
        payload: { name: 'Valhalla', locationId: 4559, timeZone: 'ValhallaTime' }
      })).toMatchSnapshot()
    })
  })

  describe('Permission', () => {
    it('sets permission data', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.PERMISSIONS.SET,
        payload: {
          feature: [
            {
              permissionName: 'FirstPermission',
              displayName: 'First Permission',
              permissionEffect: 'ALLOW',
              accessible: true
            }
          ],
          user: [
            {
              permissionName: 'FirstPermission',
              displayName: 'First Permission',
              permissionEffect: 'ALLOW',
              accessible: true
            }
          ]
        }
      })).toMatchSnapshot()
    })
  })
  describe('DynamicTags', () => {
    it('sets dynamic tags', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.DYNAMIC_TAGS.SET,
        payload: [{
          name: 'Recipient',
          options: [{
            name: 'First Name',
            value: '{{recipient-first}}'
          },
          {
            name: 'Last Name',
            value: '{{recipient-last}}'
          }]
        }]
      })).toMatchSnapshot()
    })
  })

  describe('Loading', () => {
    it('finished loading', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.LOADING.FINISHED
      })).toMatchSnapshot()
    })
  })

  describe('Permissions', () => {
    it('sets permissions', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.PERMISSIONS.SET,
        payload: {
          feature: [
            {
              permissionName: 'FirstPermission',
              displayName: 'First Permission',
              permissionEffect: 'ALLOW',
              accessible: true
            }
          ],
          user: [
            {
              permissionName: 'FirstPermission',
              displayName: 'First Permission',
              permissionEffect: 'ALLOW',
              accessible: true
            }
          ]
        }
      })).toMatchSnapshot()
    })

    it('clears permissions', () => {
      expect(GLOBAL_REDUCER(undefined, {
        type: TYPES.PERMISSIONS.CLEAR
      })).toMatchSnapshot()
    })
  })
})
