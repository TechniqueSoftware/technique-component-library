import cloneDeep from 'lodash/cloneDeep'

import { recordSaga } from '@redux/utils'

import { GLOBAL_ACTIONS } from '@redux/global'
import { ACTIONS, TP_OPTIONS } from '../../redux'

import {
  apiCalls,
  segmentsApiCalls,
  getFollowUps,
  newTouchpoint,
  deleteTouchpoint,
  editTouchpoint,
  saveScript,
  getSegments,
  saveSegment,
  getSegmentsAttributes,
  deleteSegment,
  getFeaturePermissions
} from '../../redux/sagas'

import {
  state,
  followupsMock,
  schedulesNscripts,
  newExpected,
  editExpected,
  deleteExpected,
  schedulesNscriptsByTypeNStatus,
  segmentsMock,
  saveSegmentResMock,
  marketingAttrsMock,
  membershipAttrsMock,
  editSegmentResMock,
  segmentsSnSResMock,
  stateWithSegmentsFollowups,
  segmentsFollowupsNewExpected
} from './mock'

describe('SAGAS', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const err = new Error('some error')

  describe('Followups', () => {
    const saga = getFollowUps

    it('get followups', async () => {
      apiCalls.get = jest.fn(() => followupsMock)
      apiCalls.getSchedule = jest.fn(() => ({
        followUpSchedules: {
          schedules: schedulesNscripts.followUpSchedules,
          permissions: { canEditMemberSalesSchedules: true, canEditPtSchedules: true, canEditStudioSchedules: true }
        },
        followUpScripts: {
          scripts: schedulesNscripts.followUpScripts,
          permissions: { canEditMemberSalesScripts: true, canEditPtScripts: true, canEditStudioScripts: true }
        }
      }))
      segmentsApiCalls.getSegmentsSnS = jest.fn(() => segmentsSnSResMock)

      const dispatched = await recordSaga({ saga, state })
      expect(dispatched.length).toBe(1)
      expect(apiCalls.get).toHaveBeenCalledTimes(4)
      expect(apiCalls.getSchedule).toHaveBeenCalledTimes(1)
      expect(segmentsApiCalls.getSegmentsSnS).toHaveBeenCalledTimes(1)
    })

    it('yielded an error', async () => {
      apiCalls.get = jest.fn(() => Promise.reject(err))
      const payload = { something: 1 }

      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched.length).toBe(1)
      expect(apiCalls.get).toHaveBeenCalledTimes(1)
      expect(apiCalls.getSchedule).not.toHaveBeenCalled()
      expect(dispatched).toContainEqual(
        ACTIONS.FOLLOWUPS.ERROR('some error')
      )
    })
  })

  describe('Feature permissions', () => {
    const saga = getFeaturePermissions
    const clubPermissionsMock = {
      featurePermissions: [
        {
          permissionName: 'FollowUpSegmentsAction',
          displayName: 'Follow Up Segments',
          permissionEffect: 'ALLOW',
          accessible: true
        }
      ]
    }
    const locationPermissionsMock = {
      featurePermissions: [
        {
          permissionName: 'EmailCampaignAction',
          displayName: 'Email Campaigns',
          permissionEffect: 'ALLOW',
          accessible: true
        }
      ]
    }

    const updatedSate = {
      ...state,
      global: {
        ...state.global,
        selectedLocation: {
          clubId: 659,
          name: 'Club OS QA'
        }
      }
    }
    apiCalls.getClubFeaturePermissions = jest.fn(() => clubPermissionsMock)
    apiCalls.getLocationFeaturePermissions = jest.fn(() => locationPermissionsMock)

    it('gets club feature permissions', async () => {
      const dispatched = await recordSaga({ saga, state: updatedSate })

      expect(apiCalls.getLocationFeaturePermissions).not.toHaveBeenCalled()
      expect(apiCalls.getClubFeaturePermissions).toHaveBeenCalledWith(updatedSate.global.selectedLocation.clubId)

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(
        ACTIONS.FOLLOWUPS.SET_INNER_PERMISSIONS({
          automaticFollowUpAction: false,
          followUpSegmentsAction: true
        })
      )
      const { featurePermissions } = clubPermissionsMock
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.PERMISSIONS.SET({ feature: featurePermissions }))
    })

    it('gets location feature permissions', async () => {
      const dispatched = await recordSaga({ saga, state })

      expect(apiCalls.getClubFeaturePermissions).not.toHaveBeenCalled()
      expect(apiCalls.getLocationFeaturePermissions).toHaveBeenCalledWith(state.global.selectedLocation.locationId)

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(
        ACTIONS.FOLLOWUPS.SET_INNER_PERMISSIONS({
          automaticFollowUpAction: false,
          followUpSegmentsAction: false
        })
      )
      const { featurePermissions } = locationPermissionsMock
      expect(dispatched).toContainEqual(GLOBAL_ACTIONS.PERMISSIONS.SET({ feature: featurePermissions }))
    })
  })

  describe('New touchpoint', () => {
    const saga = newTouchpoint
    const newTpState = {
      ...state,
      global: {
        ...state.global,
        club: {
          id: 659
        }
      },
      scheduleNScripts: {
        ...state.scheduleNScripts,
        touchpointCrud: {
          ...state.scheduleNScripts.touchpointCrud,
          data: {
            type: 1,
            id: '4'
          }
        }
      }
    }

    it('creates new one for status', async () => {
      apiCalls.newTouchpoint = jest.fn()

      const payload = { dayNum: 2 }
      const dispatched = await recordSaga({ saga, payload, state: newTpState })

      expect(apiCalls.newTouchpoint).toHaveBeenCalledWith({
        autoEnabled: false,
        clubId: newTpState.global.club.id,
        dayNum: 2,
        locationId: 4585,
        followUpType: 1,
        followUpStatus: 4,
        segmentId: undefined
      })

      expect(dispatched.length).toBe(3)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.NEW_SUCCESS(newExpected)
      )
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.CLOSE()
      )
    })

    it('creates new one for segment', async () => {
      apiCalls.newTouchpoint = jest.fn()
      const mockState = {
        ...stateWithSegmentsFollowups,
        global: {
          ...stateWithSegmentsFollowups.global,
          club: {
            id: 659
          }
        },
        scheduleNScripts: {
          ...stateWithSegmentsFollowups.scheduleNScripts,
          segments: segmentsMock,
          touchpointCrud: {
            ...stateWithSegmentsFollowups.scheduleNScripts.touchpointCrud,
            data: {
              ...stateWithSegmentsFollowups.scheduleNScripts.touchpointCrud.data,
              type: 1,
              id: '11',
              segmentId: 1935
            }
          }
        }
      }

      const payload = { dayNum: 7 }
      const dispatched = await recordSaga({ saga, payload, state: mockState })

      expect(apiCalls.newTouchpoint).toHaveBeenCalledWith({
        autoEnabled: false,
        clubId: mockState.global.club.id,
        dayNum: 7,
        locationId: 4585,
        followUpType: mockState.scheduleNScripts.touchpointCrud.data.type,
        followUpStatus: parseInt(mockState.scheduleNScripts.touchpointCrud.data.id, 10),
        segmentId: mockState.scheduleNScripts.touchpointCrud.data.segmentId
      })

      expect(dispatched.length).toBe(3)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.NEW_SUCCESS(segmentsFollowupsNewExpected)
      )
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.OPEN({
          action: TP_OPTIONS.EDIT,
          data: {
            autoEnabled: false,
            clubId: 659,
            dayNum: 7,
            daysTillNext: 5,
            displayName: undefined,
            followUpSeqNum: 2,
            followUpStatus: 11,
            followUpType: 1,
            locationId: 4585,
            segmentId: 1935
          }
        })
      )
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.CLOSE()
      )
    })

    it('yielded an error', async () => {
      apiCalls.newTouchpoint = jest.fn(() => Promise.reject(err))
      const payload = { dayNum: 3 }
      const dispatched = await recordSaga({ saga, payload, state })

      expect(dispatched.length).toBe(1)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.NEW_ERROR("Cannot read properties of undefined (reading 'segmentId')")
      )
    })
  })

  describe('Edits touchpoint', () => {
    const saga = editTouchpoint

    it('edits existing touchpoint', async () => {
      apiCalls.editTouchpoint = jest.fn()

      const mockState = cloneDeep(state)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: 4,
        followUpSeqNum: 1
      }

      const payload = { dayNum: 10, order: 'last' }
      const dispatched = await recordSaga({ saga, payload, state: mockState })

      expect(apiCalls.editTouchpoint).toHaveBeenCalledWith({
        clubId: undefined,
        order: 'last',
        newDayNum: 10,
        locationId: 4585,
        followUpType: 1,
        followUpStatus: 4,
        sequence: 1
      })

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.EDIT_SUCCESS({ followups: editExpected, snackbar: 'EDIT_SUCCESS' })
      )
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.CLOSE()
      )
    })

    it('yielded an error', async () => {
      apiCalls.editTouchpoint = jest.fn(() => Promise.reject(err))
      const payload = { dayNum: 10, order: 'last' }
      const dispatched = await recordSaga({ saga, payload, state })
      expect(dispatched.length).toBe(1)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.EDIT_ERROR("Cannot read properties of undefined (reading 'followUpType')")
      )
    })
  })

  describe('Delete touchpoint', () => {
    const saga = deleteTouchpoint

    it('deletes one', async () => {
      apiCalls.deleteTouchpoint = jest.fn()

      const mockState = cloneDeep(state)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: '4',
        followUpSeqNum: 2
      }
      const dispatched = await recordSaga({ saga, undefined, state: mockState })

      expect(apiCalls.deleteTouchpoint).toHaveBeenCalledWith({
        clubId: undefined,
        locationId: 4585,
        followUpType: 1,
        followUpStatus: '4',
        followUpSeqNum: 2
      })

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.DELETE_SUCCESS(deleteExpected)
      )
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.CLOSE()
      )
    })

    it('yielded an error', async () => {
      apiCalls.deleteTouchpoint = jest.fn(() => Promise.reject(err))
      const dispatched = await recordSaga({ saga, undefined, state })

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.CLOSE()
      )
    })
  })

  describe('Save scripts for club', () => {
    const saga = saveScript
    const payload = {
      followUpSchedule: {
        autoEnabled: false,
        clubId: 659,
        daysTillNext: 30,
        followUpSeqNum: 10,
        followUpStatus: 5,
        followUpType: 1
      },
      scriptsToSave: [
        {
          actionType: 1,
          clubId: 659,
          followUpSeqNum: 10,
          followUpStatus: 5,
          followUpType: 1,
          script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}aaa.</p>'
        }
      ]
    }

    it('updates followups after setting new scripts', async () => {
      apiCalls.saveClubScript = jest.fn(() => schedulesNscriptsByTypeNStatus)
      apiCalls.saveLocationScript = jest.fn(() => schedulesNscriptsByTypeNStatus)
      const mockState = cloneDeep(state)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: '4',
        followUpSeqNum: 2
      }
      const dispatched = await recordSaga({ saga, payload, state: mockState })
      expect(apiCalls.saveClubScript).toHaveBeenCalledTimes(1)
      expect(apiCalls.saveLocationScript).toHaveBeenCalledTimes(0)
      expect(dispatched).toContainEqual(
        ACTIONS.TOUCHPOINT.EDIT_SUCCESS({ followups: state.scheduleNScripts.followups, snackbar: 'SCRIPT_SUCCESS' })
      )
    })
  })

  describe('Save segment scripts for club', () => {
    const saga = saveScript
    const payload = {
      followUpSchedule: {
        autoEnabled: false,
        clubId: 659,
        daysTillNext: 12,
        followUpSeqNum: 2,
        followUpStatus: 11,
        followUpType: 1
      },
      scriptsToSave: [
        {
          segmentId: 1935,
          actionType: 1,
          clubId: 659,
          followUpSeqNum: 2,
          followUpStatus: 11,
          followUpType: 1,
          script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}</p>'
        }
      ]
    }

    it('updates followups after setting new scripts', async () => {
      segmentsApiCalls.saveClubScript = jest.fn(() => undefined)
      const mockState = cloneDeep(stateWithSegmentsFollowups)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: '11',
        followUpSeqNum: 2
      }
      const dispatched = await recordSaga({ saga, payload, state: mockState })
      expect(segmentsApiCalls.saveClubScript).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(1)
      const dispatchPayload = { followups: mockState.scheduleNScripts.followups, snackbar: 'SCRIPT_SUCCESS' }
      expect(dispatched).toContainEqual(ACTIONS.TOUCHPOINT.EDIT_SUCCESS(dispatchPayload))
    })
  })

  describe('Save scripts for location', () => {
    const saga = saveScript
    const payload = {
      followUpSchedule: {
        autoEnabled: false,
        clubId: 659,
        daysTillNext: 30,
        followUpSeqNum: 10,
        followUpStatus: 5,
        followUpType: 1
      },
      scriptsToSave: [
        {
          actionType: 1,
          clubId: 659,
          locationId: 4585,
          followUpSeqNum: 10,
          followUpStatus: 5,
          followUpType: 1,
          script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}aaa.</p>'
        }
      ]
    }

    it('updates followups after setting new scripts', async () => {
      const mockState = cloneDeep(state)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: '4',
        followUpSeqNum: 2,
        daysTillNext: 10
      }
      apiCalls.saveClubScript = jest.fn(() => schedulesNscriptsByTypeNStatus)
      apiCalls.saveLocationScript = jest.fn(() => schedulesNscriptsByTypeNStatus)
      await recordSaga({ saga, payload, state: mockState })
      expect(apiCalls.saveClubScript).toHaveBeenCalledTimes(0)
      expect(apiCalls.saveLocationScript).toHaveBeenCalledTimes(1)
    })
  })

  describe('Save segment scripts for location', () => {
    const saga = saveScript
    const payload = {
      followUpSchedule: {
        autoEnabled: false,
        clubId: 659,
        daysTillNext: 12,
        followUpSeqNum: 2,
        followUpStatus: 11,
        followUpType: 1
      },
      scriptsToSave: [
        {
          segmentId: 1935,
          actionType: 1,
          clubId: 659,
          locationId: 4585,
          followUpSeqNum: 2,
          followUpStatus: 11,
          followUpType: 1,
          script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}</p>'
        }
      ]
    }

    it('updates followups after setting new scripts', async () => {
      segmentsApiCalls.saveLocationScript = jest.fn(() => undefined)
      const mockState = cloneDeep(stateWithSegmentsFollowups)
      mockState.scheduleNScripts.touchpointCrud.data = {
        followUpType: 1,
        followUpStatus: '11',
        followUpSeqNum: 2
      }
      const dispatched = await recordSaga({ saga, payload, state: mockState })
      expect(segmentsApiCalls.saveLocationScript).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(1)
      const dispatchPayload = { followups: mockState.scheduleNScripts.followups, snackbar: 'SCRIPT_SUCCESS' }
      expect(dispatched).toContainEqual(ACTIONS.TOUCHPOINT.EDIT_SUCCESS(dispatchPayload))
    })
  })

  describe('Segments', () => {
    const segmentsState = {
      ...state,
      scheduleNScripts: {
        followups: state.scheduleNScripts.followups.map(fu => ({
          ...fu,
          statuses: fu.statuses.concat({
            id: '11',
            name: 'Web Lead',
            groupName: 'Prospect',
            customClubLabel: null,
            hidden: 'false',
            displayName: 'Active Guest',
            followUpTab: '0',
            segments: segmentsMock,
            schedules: []
          })
        }))
      }
    }
    it('sets segments', async () => {
      const saga = getSegments
      const payload = { followUpType: 1, followUpStatus: 11, rowName: 'Web Lead' }
      const dispatched = await recordSaga({ saga, payload, state: segmentsState })

      expect(dispatched.length).toBe(2)
      expect(dispatched).toContainEqual(ACTIONS.SEGMENTS.SET(segmentsMock))
      expect(dispatched).toContainEqual(
        ACTIONS.SEGMENTS.SET_DATA({
          followUpType: payload.followUpType,
          followUpStatus: payload.followUpStatus,
          title: payload.rowName
        })
      )
    })

    it('sets segment attributes', async () => {
      const saga = getSegmentsAttributes
      segmentsApiCalls.getMarketingSources = jest.fn(() => marketingAttrsMock)
      segmentsApiCalls.getMembershipTypes = jest.fn(() => membershipAttrsMock)

      const dispatched = await recordSaga({ saga, state })
      expect(segmentsApiCalls.getMarketingSources).toHaveBeenCalledTimes(1)
      expect(segmentsApiCalls.getMembershipTypes).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(1)
      expect(dispatched).toContainEqual(
        ACTIONS.SEGMENTS.SET_ATTRIBUTES({
          marketing: marketingAttrsMock.content,
          membership: membershipAttrsMock.content.reduce(
            (acc, mt) => (mt.ignored !== 0 ? acc : acc.concat(mt.membershipId.name)),
            []
          )
        })
      )
    })

    it('saves a new segment', async () => {
      const saga = saveSegment
      const updatedState = {
        ...segmentsState,
        scheduleNScripts: {
          ...segmentsState.scheduleNScripts,
          segments: segmentsMock
        }
      }
      segmentsApiCalls.save = jest.fn(() => saveSegmentResMock)

      const payload = {
        followUpType: 1,
        followUpStatus: 11,
        segmentName: 'Segment I',
        segmentAttributes: [{ attributeValue: 'Marketing-1', attributeType: 'Marketing Source' }],
        onSave: jest.fn()
      }

      const dispatched = await recordSaga({ saga, payload, state: updatedState })
      expect(segmentsApiCalls.save).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(4)
      expect(dispatched).toContainEqual(ACTIONS.SNACKBAR.SET('SEGMENT_NEW'))
      expect(dispatched).toContainEqual(
        ACTIONS.SEGMENTS.SET(
          segmentsMock
            .concat({ ...saveSegmentResMock, name: saveSegmentResMock.segmentName })
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      )
      expect(dispatched).toContainEqual(ACTIONS.SEGMENTS.ERROR(''))
      expect(payload.onSave).toHaveBeenCalled()
    })

    it('edits a segment', async () => {
      const saga = saveSegment
      const editedSegment = { ...editSegmentResMock, name: editSegmentResMock.segmentName }
      const updatedSegments = segmentsMock
        .filter(s => s.segmentId !== editSegmentResMock.segmentId)
        .concat(editedSegment)
        .sort((a, b) => a.name.localeCompare(b.name))

      const updatedState = {
        ...segmentsState,
        scheduleNScripts: {
          ...segmentsState.scheduleNScripts,
          segments: updatedSegments
        }
      }
      segmentsApiCalls.save = jest.fn(() => editSegmentResMock)

      const payload = {
        followUpType: 1,
        followUpStatus: 11,
        segmentName: editSegmentResMock.segmentName,
        segmentId: segmentsMock[0].segmentId,
        segmentAttributes: editSegmentResMock.segmentAttributes,
        onSave: jest.fn()
      }

      const dispatched = await recordSaga({ saga, payload, state: updatedState })
      expect(segmentsApiCalls.save).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(4)
      expect(dispatched).toContainEqual(ACTIONS.SEGMENTS.SET(updatedSegments))
      expect(dispatched).toContainEqual(ACTIONS.SNACKBAR.SET('SEGMENT_EDIT'))
      expect(dispatched).toContainEqual(ACTIONS.SEGMENTS.ERROR(''))
      expect(payload.onSave).toHaveBeenCalled()
    })

    it('deletes a segment', async () => {
      const saga = deleteSegment
      const updatedSegments = [segmentsMock[1]]
      const updatedState = {
        ...segmentsState,
        scheduleNScripts: {
          ...segmentsState.scheduleNScripts,
          segments: updatedSegments
        }
      }
      segmentsApiCalls.delete = jest.fn(() => saveSegmentResMock)

      const payload = {
        followUpType: 1,
        followUpStatus: 11,
        segment: segmentsMock[0],
        onSave: jest.fn()
      }

      const dispatched = await recordSaga({ saga, payload, state: updatedState })
      expect(segmentsApiCalls.delete).toHaveBeenCalledTimes(1)
      expect(dispatched.length).toBe(3)
      expect(dispatched).toContainEqual(ACTIONS.SNACKBAR.SET('SEGMENT_DELETE'))
      expect(dispatched).toContainEqual(
        ACTIONS.SEGMENTS.SET(updatedSegments)
      )
      expect(payload.onSave).toHaveBeenCalled()
    })
  })
})
