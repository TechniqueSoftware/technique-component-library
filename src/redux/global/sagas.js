import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import axios from '@axios'

import { APP_TEST_USER, IS_DEV } from '@global/env'
import { arrayIsEmpty, objectIsEmpty, getCookie } from '@utils'

import ACTIONS from './actions'
import SELECTORS from './selectors'
import { TYPES } from './types'
import { PERMISSIONS } from './constants'

export const apiCalls = {
  getUserData: userId => axios.get(`/users/${userId}?limited=true`),
  getClubData: clubId => axios.get(`/clubs?clubId=${clubId}`),
  getLocationData: locationId => axios.get(`/locations?locationId=${locationId}`),
  getAllowedLocationsData: (userId, p = 0, s = 1000) => axios.get(`/users/${userId}/location-access?size=${s}&page=${p}&sortDir=ASC&sortOn=locationName`), // eslint-disable-line max-len
  getUserPermissions: id => axios.get(`/users/${id}/permissions`),
  getClubFeaturePermissions: clubId => axios.get(`/clubs/${clubId}?includePermissions=true`),
  getLocationFeaturePermissions: locationId => axios.get(`/locations/${locationId}?includePermissions=true`),
  getDynamicTags: locationId => axios.get(`/settings/dynamic-tags?locationId=${locationId}`)
}

const getUser = async () => {
  let user = await SELECTORS.USER()
  if (!objectIsEmpty(user)) return null

  const loggedInUser = getCookie('loggedInUserId', document.cookie)
  const localUser = IS_DEV && !loggedInUser ? APP_TEST_USER : loggedInUser

  user = localUser ? await apiCalls.getUserData(localUser) : {}
  if (objectIsEmpty(user)) throw new Error('There is no user')

  return user
}

const getDelegatedUser = async () => {
  let delegatedUser = await SELECTORS.DELEGATED_USER()
  const newDelegatedUser = getCookie('delegatedUserId', document.cookie)
  if (delegatedUser.userId === newDelegatedUser) return null

  const localUser = IS_DEV && !newDelegatedUser ? APP_TEST_USER : newDelegatedUser

  delegatedUser = localUser ? await apiCalls.getUserData(localUser) : {}
  if (objectIsEmpty(delegatedUser)) throw new Error('There is no delegated user')

  return delegatedUser
}

const getClub = async clubId => {
  let club = await SELECTORS.CLUB()
  if (!objectIsEmpty(club)) return null

  club = await apiCalls.getClubData(clubId)
  return club.content[0]
}

const getAllowedLocations = async userId => {
  const currentLocData = await SELECTORS.LOCATIONS()
  if (!arrayIsEmpty(currentLocData)) return null
  try {
    const { content, totalPages } = await apiCalls.getAllowedLocationsData(userId)
    const { unrestrictedAdmin } = content[0]
    if (totalPages === 1) return { locations: content, unrestrictedAdmin }
    const promises = Array.from({ length: totalPages - 1 }, (_, i) => apiCalls.getAllowedLocationsData(userId, i + 1))
    const locationResponses = await Promise.all(promises)
    const locations = locationResponses.reduce((acc, { content }) => acc.concat(content), content)
    return { locations, unrestrictedAdmin }
  } catch (e) {
    return null
  }
}

const convertTagstoArray = async (dynamicTagsList, userPermissions) => {
  const { dynamicTags: tagsPermission } = PERMISSIONS
  const tagsAllowed = (!!userPermissions && userPermissions.some(up => up.permissionName === tagsPermission.name
    && up.permissionEffect === 'ALLOW'))

  const groups = []
  Object.keys(dynamicTagsList).forEach(key => {
    const tagTypes = dynamicTagsList[key]
    const options = []
    tagTypes.dynamicTags.forEach(tag => {
      if (!tagsAllowed && tagsPermission.tags.find(element => element === tag.name)) return
      options.push({ name: tag.name, value: tag.dynamicTag })
    })
    groups.push({ name: tagTypes.label, options })
  })
  return groups
}

export function* getUserData ({ payload }) {
  const { needsClubAndLocations, data } = payload
  try {
    const existingUser = yield call(getUser)
    const delegatedUser = yield call(getDelegatedUser)

    if (!existingUser) return

    const isSystemAdmin = existingUser.role?.id === '1'
    const currentUser = isSystemAdmin ? delegatedUser : existingUser

    yield put(ACTIONS.USER.SET_LOGGED_IN(existingUser))
    yield put(ACTIONS.USER.SET_DELEGATED(delegatedUser))

    const permissionsRes = yield call(apiCalls.getUserPermissions, currentUser.userId)
    const { featurePermissions, userPermissions } = permissionsRes.permissions
    yield put(ACTIONS.PERMISSIONS.SET({ feature: featurePermissions, user: userPermissions }))

    if (!needsClubAndLocations) return

    const [newClub, newLoc] = yield all([
      call(getClub, currentUser.clubId),
      call(getAllowedLocations, currentUser.userId)
    ])
    if (newClub) yield put(ACTIONS.CLUB.SET(newClub))
    const { unrestrictedAdmin, locations } = newLoc
    if (unrestrictedAdmin && !data.currentLocation) {
      const clubPermissions = yield call(apiCalls.getClubFeaturePermissions, currentUser.clubId)
      yield put(ACTIONS.PERMISSIONS.SET({ feature: clubPermissions.featurePermissions }))
    }

    if (!locations) return

    const defaultLocation = locations.find(loc => !!loc.defaultLocation) || locations[0]
    yield put(ACTIONS.USER.SET_LOGGED_IN({ ...currentUser, unrestrictedAdmin }))
    yield put(ACTIONS.LOCATIONS.SET_ALL(locations))
    const initialLocation = unrestrictedAdmin
      ? {
        name: newClub.name,
        value: newClub.id,
        clubId: newClub.id,
        isClub: true
      }
      : {
        name: defaultLocation.locationName,
        value: `${defaultLocation.locationId}`,
        locationName: defaultLocation.locationName,
        locationId: defaultLocation.locationId
      }
    yield put(ACTIONS.LOCATIONS.SELECT(initialLocation))

    if (unrestrictedAdmin && !data.currentLocation) return

    const locationId = data.currentLocation ? parseInt(data.currentLocation, 10) : defaultLocation.locationId
    const locationPermissions = yield call(apiCalls.getLocationFeaturePermissions, locationId)
    yield put(ACTIONS.PERMISSIONS.SET({ feature: locationPermissions.featurePermissions }))
  } catch (err) {
    yield put(ACTIONS.DATA.ERROR(err))
  } finally {
    yield put(ACTIONS.LOADING.FINISHED())
  }
}

export function* getTags ({ payload }) {
  let dynamicTags = yield SELECTORS.DYNAMIC_TAGS()
  if (!objectIsEmpty(dynamicTags)) return null

  dynamicTags = yield apiCalls.getDynamicTags(payload)
  const permissions = yield select(SELECTORS.PERMISSIONS)
  const dynamicTagsArray = yield call(convertTagstoArray, dynamicTags.labelGroup, permissions.user)
  yield put(ACTIONS.DYNAMIC_TAGS.SET(dynamicTagsArray))
}

export function* selectLocation ({ payload }) {
  const { clubId, locationId } = payload
  if (clubId) {
    const club = yield select(SELECTORS.CLUB)
    return yield put(ACTIONS.LOCATIONS.SET({ ...payload, timeZone: club.timeZone }))
  }
  const dataResponse = yield call(apiCalls.getLocationData, locationId)
  const { timeZone } = dataResponse.content[0]
  yield put(ACTIONS.LOCATIONS.SET({ ...payload, timeZone }))
}

export default function* saga () {
  yield takeLatest(TYPES.DATA.GET, getUserData)
  yield takeLatest(TYPES.DYNAMIC_TAGS.GET, getTags)
  yield takeLatest(TYPES.LOCATIONS.SELECT, selectLocation)
}
