import { getStatus, parseSnSData, updateTouchpointInFollowups } from '../utils'

const segmentsResMock = [
  {
    clubId: 659,
    followUpType: 1,
    followUpStatus: 2,
    followUpSegments: [
      {
        segmentId: 1935,
        name: 'Updated Segment at Status Level',
        segmentAttributes: [
          {
            attributeId: 1936,
            attributeValue: 'Flyer',
            attributeType: 'Marketing Source'
          },
          {
            attributeId: 1940,
            attributeValue: 'Other',
            attributeType: 'Marketing Source'
          }
        ],
        createdAt: '2022-11-03T21:47:51Z',
        createdBy: 20,
        updatedAt: '2022-11-03T22:01:10Z',
        updatedBy: 20,
        isDeleted: false
      },
      {
        segmentId: 1943,
        name: 'Segment to be deleted',
        segmentAttributes: [
          {
            attributeId: 1944,
            attributeValue: 'Drive By',
            attributeType: 'Marketing Source'
          }
        ],
        createdAt: '2022-11-07T16:58:04Z',
        createdBy: 20,
        updatedAt: '2022-11-07T16:58:04Z',
        updatedBy: 20,
        isDeleted: false
      }
    ],
    followUpSchedules: [
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 1,
        daysTillNext: 1,
        autoEnabled: false
      },
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 2,
        daysTillNext: 14,
        autoEnabled: false
      },
      {
        segmentId: 1943,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 1,
        daysTillNext: 0,
        autoEnabled: false
      },
      {
        segmentId: 1943,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 2,
        daysTillNext: 5,
        autoEnabled: false
      },
      {
        segmentId: 1943,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 3,
        daysTillNext: 5,
        autoEnabled: false
      },
      {
        segmentId: 1943,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 4,
        daysTillNext: 5,
        autoEnabled: false
      },
      {
        segmentId: 1943,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 5,
        daysTillNext: 5,
        autoEnabled: false
      }
    ],
    followUpSegmentScripts: [
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 1,
        script: '<p>Updated Email Script</p>',
        emailSubject: 'Testing Update',
        actionType: 2
      },
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 1,
        script: "<p>Hi, I'm a segment script</p>",
        actionType: 3
      },
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 2,
        script: '<p>Updated Email Script</p>',
        emailSubject: 'Testing Update',
        actionType: 2
      },
      {
        segmentId: 1935,
        clubId: 659,
        followUpType: 1,
        followUpStatus: 2,
        followUpSeqNum: 2,
        script: "<p>Hi, I'm an updated segment script</p>",
        actionType: 3
      }
    ]
  }
]

const SnSResMock = {
  followUpScripts: {
    permissions: {
      canEditMemberSalesScripts: false,
      canEditPtScripts: true,
      canEditStudioScripts: false
    },
    scripts: [
      {
        clubId: 659,
        followUpType: 1,
        followUpStatus: 1,
        followUpSeqNum: 1,
        script: '<p>Test Call</p>',
        actionType: 1
      },
      {
        clubId: 659,
        followUpType: 1,
        followUpStatus: 1,
        followUpSeqNum: 1,
        script: '<p>Test Email Body</p>',
        emailSubject: 'Test Email Subject',
        actionType: 2
      }
    ]
  },
  followUpSchedules: {
    permissions: {
      canEditMemberSalesSchedules: true,
      canEditPtSchedules: true,
      canEditStudioSchedules: false
    },
    schedules: [
      {
        clubId: 659,
        followUpType: 1,
        followUpStatus: 1,
        followUpSeqNum: 1,
        daysTillNext: 0,
        autoEnabled: false
      },
      {
        clubId: 659,
        followUpType: 1,
        followUpStatus: 1,
        followUpSeqNum: 2,
        daysTillNext: 1,
        autoEnabled: false
      },
      {
        clubId: 659,
        followUpType: 1,
        followUpStatus: 1,
        followUpSeqNum: 3,
        daysTillNext: 2,
        autoEnabled: false
      }
    ]
  }
}

const followUpsMock = [
  {
    id: '1',
    name: 'Tab 1',
    type: 1,
    statuses: [
      {
        id: '1',
        name: 'Status 1-1',
        displayName: 'Status 1-1',
        followUpTab: '1',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 2,
            followUpSeqNum: 1,
            dayNum: 2,
            followUpStatus: 11,
            followUpType: 1,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 1,
                followUpStatus: 11,
                followUpType: 1,
                script: 'Hi'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Status 1-2',
        followUpTab: '1'
      },
      {
        id: '3',
        name: 'Status 1-3',
        followUpTab: '1'
      },
      {
        id: '4',
        name: 'Status 1-4',
        followUpTab: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Tab 2',
    type: 1,
    statuses: [
      {
        id: '1',
        name: 'Status 2-1',
        followUpTab: '2'
      },
      {
        id: '2',
        name: 'Status 2-2',
        followUpTab: '2'
      },
      {
        id: '3',
        name: 'Status 2-3',
        followUpTab: '2'
      },
      {
        id: '4',
        name: 'Status 2-4',
        followUpTab: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Tab 3',
    type: 2,
    statuses: [
      {
        id: '1',
        name: 'Status 3-1',
        followUpTab: '3'
      },
      {
        id: '2',
        name: 'Status 3-2',
        followUpTab: '3'
      },
      {
        id: '3',
        name: 'Status 3-3',
        followUpTab: '3'
      },
      {
        id: '4',
        name: 'Status 3-4',
        followUpTab: '3'
      }
    ]
  }
]

describe('schedule and scripts utils', () => {
  describe('getStatus', () => {
    it('should get a status from followups', () => {
      expect(getStatus(followUpsMock, 1, '1')).toStrictEqual(followUpsMock[0].statuses[0])
    })
    it('should return falsy if does not match any type', () => {
      expect(getStatus(followUpsMock, 3, '1')).toBeFalsy()
    })
    it('should return falsy if does not match any status id', () => {
      expect(getStatus(followUpsMock, 1, '10')).toBeFalsy()
    })
  })

  describe('updateTouchpointInFollowups', () => {
    it('should set a modified touchpoint in followups', () => {
      const tpParams = { followUpType: 1, followUpStatus: 1, followUpSeqNum: 1 }
      const tpNewData = { followUpTime: '12:00:00', scripts: ['Hi, add this script!'] }
      const newFollowups = updateTouchpointInFollowups(followUpsMock, tpParams, tpNewData)
      expect(newFollowups[0].statuses[0].schedules[0].scripts).toStrictEqual(tpNewData.scripts)
      expect(newFollowups[0].statuses[0].schedules[0].id).toBe(followUpsMock[0].statuses[0].schedules[0].id)
      expect(newFollowups[0].statuses[0].schedules[0].followUpTime).toBe(tpNewData.followUpTime)
    })
    it('should not modify any touchpoint if tp followUpSeqNum does not match', () => {
      const tpParams = { followUpType: 1, followUpStatus: 1, followUpSeqNum: 3 }
      const tpNewData = { followUpTime: '12:00:00', scripts: ['Hi, add this script!'] }
      const newFollowups = updateTouchpointInFollowups(followUpsMock, tpParams, tpNewData)
      expect(newFollowups).toStrictEqual(followUpsMock)
    })
  })

  describe('parseSnSData', () => {
    it('should return followups and permissions', () => {
      const { followups, canEditSchedules, canEditScripts } = parseSnSData(
        followUpsMock,
        SnSResMock.followUpSchedules,
        SnSResMock.followUpScripts,
        []
      )
      expect(followups).toHaveLength(followUpsMock.length)
      expect(followups[0].statuses[1].segments).toHaveLength(0)
      expect(canEditSchedules).toBe(SnSResMock.followUpSchedules.permissions.canEditMemberSalesSchedules)
      expect(canEditScripts).toBe(SnSResMock.followUpScripts.permissions.canEditMemberSalesScripts)
    })

    it('should return followups with segments schedules and permissions', () => {
      const { followups, canEditSchedules, canEditScripts } = parseSnSData(
        followUpsMock,
        SnSResMock.followUpSchedules,
        SnSResMock.followUpScripts,
        segmentsResMock
      )
      expect(followups).toHaveLength(followUpsMock.length)
      expect(followups[0].statuses[1].segments).toHaveLength(segmentsResMock[0].followUpSegments.length)
      expect(canEditSchedules).toBe(SnSResMock.followUpSchedules.permissions.canEditMemberSalesSchedules)
      expect(canEditScripts).toBe(SnSResMock.followUpScripts.permissions.canEditMemberSalesScripts)
    })
  })
})
