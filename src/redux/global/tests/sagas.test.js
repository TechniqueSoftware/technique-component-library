import { recordSaga } from '@redux/utils'

import { GLOBAL_ACTIONS } from '..'

import { apiCalls, getUserData, getTags, selectLocation } from '../sagas'

import {
  state,
  emptyState,
  userData,
  clubData,
  allowedLocationsData,
  expectedAllowedLocationsData,
  permissions,
  dynamicTags,
  dynamicTagsState,
  restrictedAllowedLocationsData,
  expectedRestrictedAllowedLocationsData
} from './mock'

apiCalls.getUserData = jest.fn(() => userData)
apiCalls.getClubData = jest.fn(() => clubData)
apiCalls.getAllowedLocationsData = jest.fn(() => allowedLocationsData)
apiCalls.getUserPermissions = jest.fn(() => permissions)
apiCalls.getClubFeaturePermissions = jest.fn(() => permissions)
apiCalls.getLocationFeaturePermissions = jest.fn(() => permissions)
apiCalls.getDynamicTags = jest.fn(() => dynamicTags)

describe('GLOBAL SAGAS', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('get user data', () => {
    const saga = getUserData

    it('get only user data', async () => {
      const payload = { needsClubAndLocations: false }

      const dispatched = await recordSaga({ saga, payload, state: emptyState })

      expect(dispatched.length).toEqual(4)
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.USER.SET_LOGGED_IN(userData)
      )
      const { featurePermissions, userPermissions } = permissions.permissions
      const newPermissions = { user: userPermissions, feature: featurePermissions }
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.PERMISSIONS.SET(newPermissions)
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOADING.FINISHED()
      )

      expect(apiCalls.getUserData).toHaveBeenCalledTimes(1)
      expect(apiCalls.getUserPermissions).toHaveBeenCalledTimes(1)
      expect(apiCalls.getClubData).not.toHaveBeenCalled()
      expect(apiCalls.getAllowedLocationsData).not.toHaveBeenCalled()
    })

    it('gets user, club and locations data', async () => {
      const payload = { needsClubAndLocations: true, data: { currentLocation: '4585' } }

      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched.length).toEqual(9)
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.USER.SET_LOGGED_IN(userData)
      )
      const { featurePermissions, userPermissions } = permissions.permissions
      const newPermissions = { user: userPermissions, feature: featurePermissions }
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.PERMISSIONS.SET(newPermissions)
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.CLUB.SET(clubData.content[0])
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.USER.SET_LOGGED_IN({ ...userData, unrestrictedAdmin: true })
      )

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOCATIONS.SET_ALL(expectedAllowedLocationsData.content)
      )

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOCATIONS.SELECT({
          name: 'The empire',
          value: 1,
          clubId: 1,
          isClub: true
        })
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOADING.FINISHED()
      )

      expect(apiCalls.getUserData).toHaveBeenCalledTimes(1)
      expect(apiCalls.getClubData).toHaveBeenCalledWith(userData.clubId)
      expect(apiCalls.getAllowedLocationsData).toHaveBeenCalledWith(userData.userId)
    })

    it('gets user data and permissions according to current location coming from jsp', async () => {
      const restrictedUserData = { ...userData, unrestrictedAdmin: false }
      apiCalls.getUserData = jest.fn(() => restrictedUserData)
      apiCalls.getAllowedLocationsData = jest.fn(() => restrictedAllowedLocationsData)
      const payload = { needsClubAndLocations: true, data: { currentLocation: '4585' } }

      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched.length).toEqual(9)
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.USER.SET_LOGGED_IN(restrictedUserData)
      )
      const { featurePermissions, userPermissions } = permissions.permissions
      const newPermissions = { user: userPermissions, feature: featurePermissions }
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.PERMISSIONS.SET(newPermissions)
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.CLUB.SET(clubData.content[0])
      )
      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.USER.SET_LOGGED_IN(restrictedUserData)
      )

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOCATIONS.SET_ALL(expectedRestrictedAllowedLocationsData.content)
      )

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOCATIONS.SELECT({
          locationId: 4559,
          locationName: 'Philadelphia, PA',
          name: 'Philadelphia, PA',
          value: '4559'
        })
      )

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.LOADING.FINISHED()
      )

      expect(apiCalls.getUserData).toHaveBeenCalledTimes(1)
      expect(apiCalls.getClubData).toHaveBeenCalledWith(userData.clubId)
      expect(apiCalls.getClubFeaturePermissions).not.toHaveBeenCalled()
      expect(apiCalls.getLocationFeaturePermissions).toHaveBeenCalledWith(parseInt(payload.data.currentLocation, 10))
      expect(apiCalls.getAllowedLocationsData).toHaveBeenCalledWith(userData.userId)
    })

    it('gets dynamic tags', async () => {
      const saga = getTags
      const payload = { locationId: 4585 }

      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched).toContainEqual(
        GLOBAL_ACTIONS.DYNAMIC_TAGS.SET(dynamicTagsState)
      )
      expect(apiCalls.getDynamicTags).toHaveBeenCalledTimes(1)
    })

    it('throws error', async () => {
      const payload = { needsClubAndLocations: true }
      const error = new Error('There is no user')
      apiCalls.getUserData = jest.fn(() => Promise.reject(error))

      const dispatched = await recordSaga({ saga, payload, state })
      expect(dispatched.length).toBe(2)
      expect(apiCalls.getUserData).toHaveBeenCalledTimes(1)
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.DATA.ERROR(error))
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.LOADING.FINISHED())
    })
  })

  describe('Selected location', () => {
    it('selects and sets location', async () => {
      const saga = selectLocation
      const payload = { clubId: undefined, locationId: 1974 }
      apiCalls.getLocationData = jest.fn(() => ({
        content: [{
          locationId: 1974,
          locationName: 'Newells',
          name: 'Newells',
          timeZone: 'Newells/Old/Boys'
        }]
      }))
      const dispatched = await recordSaga({ saga, payload, state })
      expect(apiCalls.getLocationData).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(1)
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.LOCATIONS.SET({
        ...payload,
        timeZone: 'Newells/Old/Boys'
      }))
    })

    it('selects and sets club', async () => {
      const saga = selectLocation
      const payload = { clubId: 659, locationId: undefined }
      const dispatched = await recordSaga({ saga, payload, state })
      expect(apiCalls.getLocationData).not.toHaveBeenCalled()
      expect(apiCalls.getUserData).not.toHaveBeenCalled()
      expect(dispatched.length).toBe(1)
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.LOCATIONS.SET({
        ...payload,
        timeZone: state.global.club.timeZone
      }))
    })
  })
})
