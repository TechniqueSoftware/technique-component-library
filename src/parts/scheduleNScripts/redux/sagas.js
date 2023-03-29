import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import axios from '@axios'

import { GLOBAL_SELECTOR } from '@redux/global'
import GLOBAL_SELECTORS from '@redux/global/selectors'
import GLOBAL_ACTIONS from '@redux/global/actions'

import { decapitalize, removeTagsFromText } from '@utils/index'
import TYPES from './types'
import ACTIONS from './actions'
import SELECTORS from './selectors'

import {
  getStatus,
  setFollowUpStatusValue,
  setFollowUpScripts,
  getSchedulesByDay,
  parseSnSData,
  sortSegments,
  getCurrentSchedules
} from '../utils'
import { GROUP_NAMES, TP_OPTIONS } from './constants'

export const apiCalls = {
  get: payload => axios.get('/settings/follow-up-status', { params: payload }),
  getSchedule: payload => axios.get('/settings/follow-up-schedules-scripts', { params: payload }),
  newTouchpoint: payload => axios.post('/settings/follow-up-touchpoint', payload),
  deleteTouchpoint: payload => axios.delete('/settings/follow-up-touchpoint', { data: payload }),
  saveClubScript: payload => axios.put('/settings/club-follow-up-schedules-scripts', payload),
  saveLocationScript: payload => axios.put('/settings/location-follow-up-schedules-scripts', payload),
  editTouchpoint: payload => axios.put('/settings/follow-up-touchpoint', payload),
  getSegments: payload => axios.get('/settings/segments', { params: payload }),
  getClubFeaturePermissions: clubId => axios.get(`/clubs/${clubId}?includePermissions=true`),
  getLocationFeaturePermissions: locationId => axios.get(`/locations/${locationId}?includePermissions=true`)
}

export const segmentsApiCalls = {
  save: payload => axios.put('/settings/segments', payload),
  delete: payload => axios.delete('/settings/segments', { data: payload }),
  getSegmentsSnS: payload => axios.get('/settings/follow-up-schedules-scripts-segments', { params: payload }),
  getMembershipTypes: payload => axios.get('/settings/membership-types', { params: payload }),
  getMarketingSources: payload => axios.get('/settings/marketing-sources-names', { params: payload }),
  saveClubScript: payload => axios.put('/settings/club-follow-up-schedules-scripts-segments', payload),
  saveLocationScript: payload => axios.put('/settings/location-follow-up-schedules-scripts-segments', payload),
  saveSegmentsToCopy: payload => axios.put('/settings/copy-segments', payload),
  getSegmentLocations: (clubId, userId) => axios.get(`/clubs/${clubId}/permissions?actions=FollowUpSegmentsAction&actions=NewFollowUpSchedulesAndScriptsAction&userId=${userId}`), // eslint-disable-line max-len
  getCopySegmentProcess: userId => axios.get(`/settings/copy-segments/in-process/${userId}`)
}

const getProspecting = async payload => {
  const { content } = await apiCalls.get({
    ...payload,
    groupName: GROUP_NAMES.PROSPECT,
    sortOrder: GROUP_NAMES.PROSPECT,
    includeHidden: true
  })

  return {
    id: '0',
    type: 1,
    name: 'Prospecting',
    statuses: content[0].followUpTypes[0].followUpStatuses
  }
}

const getMembers = async payload => {
  const { content } = await apiCalls.get({
    ...payload,
    groupName: GROUP_NAMES.ACTIVE_MEMBER,
    sortOrder: GROUP_NAMES.ACTIVE_MEMBER,
    includeHidden: true
  })
  return {
    id: '1',
    type: 1,
    name: 'Member',
    statuses: content[0].followUpTypes[0].followUpStatuses
  }
}

const getInactiveMemers = async payload => {
  const { content } = await apiCalls.get({
    ...payload,
    groupName: GROUP_NAMES.INACTIVE_MEMBER,
    sortOrder: GROUP_NAMES.INACTIVE_MEMBER,
    includeHidden: true
  })
  return {
    id: '2',
    type: 1,
    name: 'Inactive Member',
    statuses: content[0].followUpTypes[0].followUpStatuses
  }
}

const getPersonalTrainers = async payload => {
  const { content } = await apiCalls.get({
    ...payload,
    followUpType: 2,
    sortOrder: GROUP_NAMES.PERSONAL_TRAINING,
    includeHidden: true
  })

  return {
    id: '3',
    type: 2,
    name: 'Personal Training',
    statuses: content[0].followUpTypes[0].followUpStatuses
  }
}

const getAttributes = async (apiCall, payload) => {
  try {
    const { content, totalPages } = await apiCall(payload)
    if (totalPages === 1) return content
    const promises = Array.from({ length: totalPages - 1 }, (_, i) => apiCall({ ...payload, page: i + 1 }))
    const responses = await Promise.all(promises)
    return responses.reduce((acc, { content }) => acc.concat(content), content)
  } catch (err) {
    return null
  }
}

export function* getFollowUps () {
  try {
    const { clubId, unrestrictedAdmin } = yield select(GLOBAL_SELECTORS.USER)
    const { locationId, isClub } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const payload = { clubId, locationId }

    const data = []
    const p = yield call(getProspecting, payload)
    if (p.statuses?.length) data.push(p)

    const m = yield call(getMembers, payload)
    if (m.statuses?.length) data.push(m)

    const im = yield call(getInactiveMemers, payload)
    if (im.statuses?.length) data.push(im)

    const pt = yield call(getPersonalTrainers, payload)
    if (pt.statuses?.length) data.push(pt)

    const { followUpSchedules, followUpScripts } = yield call(apiCalls.getSchedule, { locationId, clubId })
    const segmentsData = yield call(segmentsApiCalls.getSegmentsSnS, { locationId, clubId })

    const overridesEdit = unrestrictedAdmin && isClub
    const { followups, canEditSchedules, canEditScripts } = parseSnSData(
      data,
      followUpSchedules,
      followUpScripts,
      segmentsData,
      isClub
    )
    yield put(ACTIONS.FOLLOWUPS.SUCCESS({
      followups,
      canEditSchedules: overridesEdit || canEditSchedules,
      canEditScripts: overridesEdit || canEditScripts
    }))
  } catch (err) {
    yield put(ACTIONS.FOLLOWUPS.ERROR(err.message))
  }
}

const INNER_PERMISSIONS_TO_CHECK = ['AutomaticFollowUpAction', 'FollowUpSegmentsAction']
const checkInnerPermissions = permissions => INNER_PERMISSIONS_TO_CHECK.reduce((acc, permissionName) => {
  const permission = permissions.find(p => p.permissionName === permissionName)
  const isAllow = permission?.permissionEffect === 'ALLOW'
  return { ...acc, [decapitalize(permissionName)]: isAllow }
}, {})

export function* getFeaturePermissions () {
  try {
    const { locationId, clubId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    if (!locationId && !clubId) return
    const { featurePermissions } = clubId
      ? yield call(apiCalls.getClubFeaturePermissions, clubId)
      : yield call(apiCalls.getLocationFeaturePermissions, locationId)
    const innerPermissions = checkInnerPermissions(featurePermissions)
    yield put(ACTIONS.FOLLOWUPS.SET_INNER_PERMISSIONS(innerPermissions))
    return yield put(GLOBAL_ACTIONS.PERMISSIONS.SET({ feature: featurePermissions }))
  } catch (err) {
    return null
  }
}

export function* newTouchpoint ({ payload }) {
  try {
    const { dayNum } = payload
    const { data: { segmentId, ...data } } = yield select(SELECTORS.TOUCHPOINT_CRUD)
    const { locationId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const club = yield select(GLOBAL_SELECTORS.CLUB)
    const followUpType = data.type ? data.type : data.followUpType
    const followUpStatus = data.id ? parseInt(data.id, 10) : data.followUpStatus
    const tp = {
      autoEnabled: false,
      clubId: club.id,
      locationId,
      followUpType,
      followUpStatus,
      dayNum: Math.max(dayNum, 0),
      segmentId
    }

    yield call(apiCalls.newTouchpoint, tp)
    const status = yield select(SELECTORS.STATUS, { followUpType, followUpStatus })
    const currentSchedules = getCurrentSchedules(segmentId, status)
    const { earlierSch, laterSch } = getSchedulesByDay(currentSchedules, dayNum)
    const newTp = {
      ...tp,
      followUpSeqNum: earlierSch.length + 1,
      daysTillNext: earlierSch.length ? dayNum - earlierSch[earlierSch.length - 1].dayNum : dayNum,
      displayName: data.displayName
    }
    const newLaterSch = laterSch.map((sch, i) => ({
      ...sch,
      followUpSeqNum: sch.followUpSeqNum + 1,
      daysTillNext: i === 0 ? sch.dayNum - tp.dayNum : sch.dayNum - laterSch[i - 1].dayNum
    }))
    const schedules = [...earlierSch, newTp, ...newLaterSch]
    const followUps = yield select(SELECTORS.FOLLOWUPS)

    const statusValueToUpdate = !segmentId
      ? { schedules }
      : {
        segments: status.segments.map(segment => segment.segmentId !== segmentId ? segment : { ...segment, followUpSchedules: schedules } // eslint-disable-line max-len
        )
      }
    const newFollowups = setFollowUpStatusValue(followUps, status, statusValueToUpdate)

    yield put(ACTIONS.TOUCHPOINT.NEW_SUCCESS(newFollowups))
    yield put(ACTIONS.TOUCHPOINT.OPEN({ action: TP_OPTIONS.EDIT, data: newTp }))

    const daysAreEqual = !!currentSchedules.find(({ dayNum }) => dayNum === tp.dayNum)
    if (!daysAreEqual) return yield put(ACTIONS.TOUCHPOINT.CLOSE())
  } catch (err) {
    yield put(ACTIONS.TOUCHPOINT.NEW_ERROR(err.message))
  }
}

export function* editTouchpoint ({ payload }) {
  try {
    const { dayNum, order = 'last' } = payload
    const { data } = yield select(SELECTORS.TOUCHPOINT_CRUD)
    const { followUpType, followUpSeqNum, followUpStatus, segmentId } = data
    const { locationId, clubId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const tp = {
      clubId,
      locationId,
      followUpType,
      followUpStatus,
      sequence: followUpSeqNum,
      newDayNum: dayNum,
      order,
      segmentId
    }

    yield call(apiCalls.editTouchpoint, tp)

    const status = yield select(SELECTORS.STATUS, { followUpType, followUpStatus })
    const currentSchedules = getCurrentSchedules(segmentId, status)
    const schedulesWithoutCurrent = currentSchedules.filter(s => s.followUpSeqNum !== followUpSeqNum)
    const { earlierSch, laterSch } = getSchedulesByDay(schedulesWithoutCurrent, dayNum, order)
    const newFollowUpSeqNum = earlierSch.length + 1
    const newEarlierSch = earlierSch.map((sch, i) => ({
      ...sch,
      followUpSeqNum: i + 1,
      daysTillNext: i === 0 ? sch.dayNum : sch.dayNum - earlierSch[i - 1].dayNum
    }))
    const newTp = {
      ...data,
      clubId,
      locationId,
      followUpSeqNum: newFollowUpSeqNum,
      dayNum,
      daysTillNext: earlierSch.length ? dayNum - earlierSch[earlierSch.length - 1].dayNum : dayNum
    }
    const newLaterSch = laterSch.map((sch, i) => ({
      ...sch,
      followUpSeqNum: newFollowUpSeqNum + i + 1,
      daysTillNext: i === 0 ? sch.dayNum - dayNum : sch.dayNum - laterSch[i - 1].dayNum
    }))
    const schedules = [...newEarlierSch, newTp, ...newLaterSch]
    const statusValueToUpdate = !segmentId
      ? { schedules }
      : {
        segments: status.segments.map(segment => segment.segmentId !== segmentId ? segment : { ...segment, followUpSchedules: schedules } // eslint-disable-line max-len
        )
      }
    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const newFollowups = setFollowUpStatusValue(followUps, status, statusValueToUpdate)
    yield put(ACTIONS.TOUCHPOINT.EDIT_SUCCESS({ followups: newFollowups, snackbar: 'EDIT_SUCCESS' }))

    const repeated = !!newEarlierSch.concat(newLaterSch).find(sch => sch.dayNum === dayNum)
    if (!repeated || order === 'first') return yield put(ACTIONS.TOUCHPOINT.CLOSE())

    yield put(
      ACTIONS.TOUCHPOINT.OPEN({
        action: TP_OPTIONS.EDIT,
        data: { ...data, followUpSeqNum: newFollowUpSeqNum }
      })
    )
  } catch (err) {
    yield put(ACTIONS.TOUCHPOINT.EDIT_ERROR(err.message))
  }
}

export function* deleteTouchpoint () {
  try {
    const { data } = yield select(SELECTORS.TOUCHPOINT_CRUD)
    const { followUpType, followUpStatus, followUpSeqNum, segmentId } = data
    const { locationId, clubId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)

    yield call(apiCalls.deleteTouchpoint, {
      clubId,
      locationId,
      followUpType,
      followUpStatus,
      followUpSeqNum,
      segmentId
    })

    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const status = yield select(SELECTORS.STATUS, { followUpType, followUpStatus })
    const currentSchedules = getCurrentSchedules(segmentId, status)
    const filteredSchedules = currentSchedules.filter(sch => sch.followUpSeqNum !== followUpSeqNum)
    const schedules = filteredSchedules.map((sch, i) => {
      if (sch.followUpSeqNum < followUpSeqNum) return sch
      return {
        ...sch,
        followUpSeqNum: sch.followUpSeqNum - 1,
        daysTillNext: i === 0 ? sch.daysTillNext : sch.dayNum - filteredSchedules[i - 1].dayNum
      }
    })

    const statusValueToUpdate = !segmentId
      ? { schedules }
      : {
        segments: status.segments.map(
          segment => (segment.segmentId !== segmentId ? segment : { ...segment, followUpSchedules: schedules }) // eslint-disable-line max-len
        )
      }
    const newFollowups = setFollowUpStatusValue(followUps, status, statusValueToUpdate)

    yield put(ACTIONS.TOUCHPOINT.DELETE_SUCCESS(newFollowups))
  } catch (err) {
    yield put(ACTIONS.TOUCHPOINT.DELETE_ERROR(err.message))
  }
  yield put(ACTIONS.TOUCHPOINT.CLOSE())
}

export function* saveScript ({ payload }) {
  try {
    const { scriptsToSave, followUpSchedule } = payload
    const { data } = yield select(SELECTORS.TOUCHPOINT_CRUD)
    const { locationId, followUpType, followUpStatus, segmentId } = scriptsToSave[0]
    const { daysTillNext, followUpSeqNum } = data
    const followUpScripts = scriptsToSave.map(scriptData => {
      const cleanScript = scriptData.script.replace(/&nbsp;/g, '')
      const script = !removeTagsFromText(cleanScript).trim().length ? null : scriptData.script
      return { ...scriptData, followUpSeqNum, daysTillNext, script }
    })

    const canEditSchedules = yield select(SELECTORS.CAN_EDIT_SCHEDULES)

    const apiCall = segmentId ? segmentsApiCalls : apiCalls
    const apiPayload = segmentId
      ? { followUpSchedule, segmentScripts: followUpScripts }
      : { followUpScripts, followUpSchedules: [followUpSchedule] }

    if (locationId !== undefined) {
      yield call(apiCall.saveLocationScript, canEditSchedules ? apiPayload : segmentId ? { segmentScripts: followUpScripts } : { followUpScripts }) //eslint-disable-line
    } else {
      yield call(apiCall.saveClubScript, segmentId ? followUpScripts : { followUpScripts })
    }

    const newScriptsData = {
      ...data,
      followUpMinutes: followUpSchedule.followUpMinutes,
      followUpTime: followUpSchedule.followUpTime,
      primaryAction: followUpSchedule.primaryAction,
      secondaryAction: followUpSchedule.secondaryAction,
      locationSegmentId: followUpSchedule.locationSegmentId,
      scripts: followUpScripts.filter(({ script }) => !!script)
    }
    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const newFollowups = setFollowUpScripts(followUps, { followUpType, followUpStatus }, newScriptsData, segmentId)
    yield put(ACTIONS.TOUCHPOINT.EDIT_SUCCESS({ followups: newFollowups, snackbar: 'SCRIPT_SUCCESS' }))
  } catch (err) {
    return null
  }
}

export function* getSegmentsAttributes () {
  try {
    const { locationId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const club = yield select(GLOBAL_SELECTORS.CLUB)
    const payload = {
      locationId,
      clubId: club.id,
      size: 100,
      page: 0
    }
    const [marketingRes, membershipRes] = yield all([
      getAttributes(segmentsApiCalls.getMarketingSources, { ...payload, excludeDisabled: true, clubOnly: !locationId }),
      getAttributes(segmentsApiCalls.getMembershipTypes, { ...payload, includeDuplicates: false })
    ])

    const membership = membershipRes.reduce(
      (acc, mt) => (mt.ignored !== 0 ? acc : acc.concat(mt.membershipId.name)),
      []
    )
    yield put(ACTIONS.SEGMENTS.SET_ATTRIBUTES({ marketing: marketingRes, membership }))
  } catch (err) {
    return null
  }
}

export function* getSegments ({ payload }) {
  try {
    const { followUpType, followUpStatus, rowName } = payload
    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const status = getStatus(followUps, followUpType, followUpStatus)
    yield put(ACTIONS.SEGMENTS.SET(status.segments))
    yield put(ACTIONS.SEGMENTS.SET_DATA({ followUpType, followUpStatus, title: rowName }))
  } catch (err) {
    return null
  }
}

export function* saveSegment ({ payload }) {
  try {
    const { segmentName, segmentAttributes, segmentId, onSave, followUpStatus, followUpType } = payload
    const { locationId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const club = yield select(GLOBAL_SELECTORS.CLUB)
    const apiPayload = {
      locationId,
      clubId: club.id,
      followUpType,
      followUpStatus,
      segmentName,
      segmentAttributes,
      segmentId
    }
    const segments = yield select(SELECTORS.SEGMENTS)
    const newSegmentRes = yield call(segmentsApiCalls.save, apiPayload)
    const newSegment = { ...newSegmentRes, name: newSegmentRes.segmentName }
    const currentSegments = segmentId ? segments.filter(s => s.segmentId !== segmentId) : segments
    const newSegments = sortSegments(currentSegments.concat(newSegment))

    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const status = getStatus(followUps, followUpType, followUpStatus)
    const currentFollowUpSegments = segmentId ? status.segments.filter(s => s.segmentId !== segmentId) : status.segments
    const existingSegment = segmentId ? status.segments.find(segment => segment.segmentId === segmentId) : { followUpSchedules: [] } // eslint-disable-line max-len
    const newFollowUpSegments = sortSegments(currentFollowUpSegments.concat({ ...existingSegment, ...newSegment }))
    const newFollowups = setFollowUpStatusValue(followUps, status, { segments: newFollowUpSegments })

    yield put(ACTIONS.FOLLOWUPS.SET(newFollowups))
    yield put(ACTIONS.SNACKBAR.SET(segmentId ? 'SEGMENT_EDIT' : 'SEGMENT_NEW'))
    yield put(ACTIONS.SEGMENTS.SET(newSegments))
    onSave()
    yield put(ACTIONS.SEGMENTS.ERROR(''))
  } catch (err) {
    yield put(ACTIONS.SEGMENTS.ERROR(err.messages.message))
  }
}

export function* deleteSegment ({ payload }) {
  try {
    const { segment, onSave, followUpType, followUpStatus } = payload
    const { segmentId } = segment
    const { locationId, clubId } = yield select(GLOBAL_SELECTORS.SELECTED_LOCATION)
    const apiPayload = {
      locationId,
      clubId,
      segmentId
    }
    yield call(segmentsApiCalls.delete, apiPayload)
    const segments = yield select(SELECTORS.SEGMENTS)
    const newSegments = segments.filter(s => s.segmentId !== segmentId)

    const followUps = yield select(SELECTORS.FOLLOWUPS)
    const status = getStatus(followUps, followUpType, followUpStatus)
    const newFollowUpSegments = status.segments.filter(s => s.segmentId !== segmentId)
    const newFollowups = setFollowUpStatusValue(followUps, status, { segments: newFollowUpSegments })

    yield put(ACTIONS.FOLLOWUPS.SET(newFollowups))
    yield put(ACTIONS.SNACKBAR.SET('SEGMENT_DELETE'))
    yield put(ACTIONS.SEGMENTS.SET(newSegments))
    onSave()
  } catch (err) {
    return null
  }
}

export function* getSegmentsLocations () {
  try {
    const { userId } = yield select(GLOBAL_SELECTOR.USER)
    const club = yield select(GLOBAL_SELECTORS.CLUB)
    const clubId = club.id
    const { allowedLocations } = yield call(segmentsApiCalls.getSegmentLocations, clubId, userId)
    yield put(ACTIONS.SEGMENTS.SET_LOCATIONS(allowedLocations))
  } catch (err) {
    return null
  }
}

export function* getSegmentsList ({ payload }) {
  try {
    const { locationId, clubId } = payload
    const segmentsData = yield call(segmentsApiCalls.getSegmentsSnS, { locationId, clubId })

    segmentsData.forEach(element => {
      element.followUpSegments = sortSegments(element.followUpSegments)
    })

    yield put(ACTIONS.SEGMENTS.SET_LIST(segmentsData))
  } catch (err) {
    return null
  }
}

export function* getCopySegmentProcess ({ payload }) {
  try {
    const copyInProcess = yield call(segmentsApiCalls.getCopySegmentProcess, payload)

    yield put(ACTIONS.SEGMENTS.SET_COPY_PROCESS(copyInProcess))
  } catch (err) {
    return null
  }
}

export default function* saga () {
  yield takeLatest(TYPES.FOLLOWUPS.GET, getFollowUps)
  yield takeLatest(TYPES.FOLLOWUPS.GET_FEATURE_PERMISSIONS, getFeaturePermissions)
  yield takeLatest(TYPES.TOUCHPOINT.NEW, newTouchpoint)
  yield takeLatest(TYPES.TOUCHPOINT.EDIT_TOUCHPOINT, editTouchpoint)
  yield takeLatest(TYPES.TOUCHPOINT.DELETE, deleteTouchpoint)
  yield takeLatest(TYPES.SCRIPTS.SAVE, saveScript)
  yield takeLatest(TYPES.SEGMENTS.GET, getSegments)
  yield takeLatest(TYPES.SEGMENTS.GET_ATTRIBUTES, getSegmentsAttributes)
  yield takeLatest(TYPES.SEGMENTS.SAVE, saveSegment)
  yield takeLatest(TYPES.SEGMENTS.DELETE, deleteSegment)
  yield takeLatest(TYPES.SEGMENTS.GET_LOCATIONS, getSegmentsLocations)
  yield takeLatest(TYPES.SEGMENTS.GET_LIST, getSegmentsList)
  yield takeLatest(TYPES.SEGMENTS.GET_COPY_PROCESS, getCopySegmentProcess)
}
