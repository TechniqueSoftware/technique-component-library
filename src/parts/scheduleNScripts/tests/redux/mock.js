import { key } from '../../redux'

export const locationIdMock = {
  locationId: 4585
}

export const permissionMock = {
  innerPermissions: {
    automaticFollowUpAction: true,
    followUpSegmentsAction: false
  }
}

export const followupsMock = {
  content: [
    {
      clubId: 659,
      followUpTypes: [
        {
          id: '1',
          name: 'Membership',
          followUpStatuses: [
            {
              id: '4',
              groupName: 'Prospect',
              customClubLabel: null,
              name: 'Active Guest',
              hidden: 'false'
            },
            {
              id: '5',
              groupName: 'Prospect',
              customClubLabel: null,
              name: 'Expired Guest',
              hidden: 'false'
            }
          ]
        },
        {
          id: '2',
          name: 'Personal Training',
          followUpStatuses: [
            {
              id: '1',
              groupName: 'PT Prospect',
              customClubLabel: null,
              name: 'Not Booked',
              hidden: 'false'
            }
          ]
        }
      ]
    }
  ]
}

export const schedulesNscripts = {
  followUpSchedules: [
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 0,
      followUpMinutes: 7,
      followUpSeqNum: 1,
      followUpStatus: 1,
      followUpTime: '09:16:00',
      followUpType: 1,
      primaryAction: 2,
      secondaryAction: 3
    },
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 1,
      followUpSeqNum: 1,
      followUpStatus: 11,
      followUpType: 1
    },
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 30,
      followUpSeqNum: 7,
      followUpStatus: 12,
      followUpType: 1
    },
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 30,
      followUpSeqNum: 10,
      followUpStatus: 5,
      followUpType: 1
    },
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 14,
      followUpSeqNum: 3,
      followUpStatus: 1,
      followUpType: 2
    },
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 2,
      followUpSeqNum: 2,
      followUpStatus: 1,
      followUpType: 1
    }
  ],
  followUpScripts: [
    {
      actionType: 2,
      clubId: 659,
      emailSubject: 'HELP3227',
      followUpSeqNum: 1,
      followUpStatus: 1,
      followUpType: 1,
      script: '<p>{{recipient-first}}</p>'
    },
    {
      actionType: 3,
      clubId: 659,
      emailSubject: 'Hi Mate',
      followUpSeqNum: 3,
      followUpStatus: 1,
      followUpType: 4,
      script: '<p>studio test</p>'
    },
    {
      actionType: 1,
      clubId: 659,
      followUpSeqNum: 10,
      followUpStatus: 5,
      followUpType: 1,
      script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
    },
    {
      actionType: 1,
      clubId: 659,
      followUpSeqNum: 4,
      followUpStatus: 12,
      followUpType: 1,
      script: '<span style="color: rgb(255, 0, 0);">Research this member</span>'
    },
    {
      actionType: 1,
      clubId: 659,
      followUpSeqNum: 2,
      followUpStatus: 1,
      followUpType: 1,
      script: 'OK, so this person activated a guest pass that just expired yesterday</p>'
    }
  ]
}

export const schedulesNscriptsByTypeNStatus = {
  followUpSchedules: [
    {
      autoEnabled: false,
      clubId: 659,
      daysTillNext: 30,
      followUpSeqNum: 10,
      followUpStatus: 5,
      followUpType: 1
    }
  ],
  followUpScripts: [
    {
      actionType: 1,
      clubId: 659,
      followUpSeqNum: 10,
      followUpStatus: 5,
      followUpType: 1,
      script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
    }
  ]
}

export const expected = [
  {
    id: '0',
    name: 'Prospecting',
    statuses: [
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '4',
        name: 'Active Guest',
        schedules: []
      },
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '5',
        name: 'Expired Guest',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 30,
            followUpSeqNum: 10,
            followUpStatus: 5,
            followUpType: 1,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 10,
                followUpStatus: 5,
                followUpType: 1,
                script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '1',
    name: 'Member',
    statuses: [
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '4',
        name: 'Active Guest',
        schedules: []
      },
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '5',
        name: 'Expired Guest',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 30,
            followUpSeqNum: 10,
            followUpStatus: 5,
            followUpType: 1,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 10,
                followUpStatus: 5,
                followUpType: 1,
                script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Inactive Member',
    statuses: [
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '4',
        name: 'Active Guest',
        schedules: []
      },
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '5',
        name: 'Expired Guest',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 30,
            followUpSeqNum: 10,
            followUpStatus: 5,
            followUpType: 1,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 10,
                followUpStatus: 5,
                followUpType: 1,
                script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Personal Training',
    statuses: [
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '4',
        name: 'Active Guest',
        schedules: []
      },
      {
        customClubLabel: null,
        groupName: 'Prospect',
        hidden: 'false',
        id: '5',
        name: 'Expired Guest',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 30,
            followUpSeqNum: 10,
            followUpStatus: 5,
            followUpType: 1,
            scripts: [
              { actionType: 1,
                clubId: 659,
                followUpSeqNum: 10,
                followUpStatus: 5,
                followUpType: 1,
                script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
              }
            ]
          }
        ]
      }
    ]
  }
]

export const newExpected = [{
  id: '0',
  name: 'Prospecting',
  statuses: [
    {
      customClubLabel: null,
      displayName: 'Active Guest',
      followUpTab: '0',
      groupName: 'Prospect',
      hidden: 'false',
      id: '4',
      name: 'Active Guest',
      schedules: [
        {
          autoEnabled: false,
          daysTillNext: 2,
          followUpSeqNum: 1,
          dayNum: 2,
          followUpStatus: 4,
          followUpType: 1,
          locationId: 4585,
          clubId: 659
        },
        {
          autoEnabled: false,
          daysTillNext: 1,
          followUpSeqNum: 2,
          dayNum: 3,
          followUpStatus: 4,
          followUpType: 1,
          locationId: 4585,
          canEditSchedules: true,
          scripts: [
            {
              actionType: 1,
              clubId: 659,
              followUpSeqNum: 10,
              followUpStatus: 5,
              followUpType: 1,
              script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
            }
          ]
        },
        {
          autoEnabled: false,
          daysTillNext: 2,
          followUpSeqNum: 3,
          dayNum: 5,
          followUpStatus: 4,
          followUpType: 1,
          locationId: 4585,
          canEditSchedules: true
        }
      ]
    },
    {
      customClubLabel: null,
      displayName: 'Expired Guest',
      followUpTab: '0',
      groupName: 'Prospect',
      hidden: 'false',
      id: '5',
      name: 'Expired Guest',
      schedules: [
        {
          autoEnabled: false,
          canEditSchedules: true,
          daysTillNext: 0,
          followUpSeqNum: 1,
          dayNum: 0,
          followUpStatus: 5,
          followUpType: 1,
          locationId: 4585
        }
      ]
    }
  ],
  type: 1
}]

export const editExpected = [{
  id: '0',
  name: 'Prospecting',
  statuses: [
    {
      customClubLabel: null,
      displayName: 'Active Guest',
      followUpTab: '0',
      groupName: 'Prospect',
      hidden: 'false',
      id: '4',
      name: 'Active Guest',
      schedules: [
        {
          locationId: 4585,
          followUpType: 1,
          followUpStatus: 4,
          followUpSeqNum: 1,
          dayNum: 5,
          daysTillNext: 5,
          autoEnabled: false,
          canEditSchedules: true
        },
        {
          locationId: 4585,
          followUpType: 1,
          followUpStatus: 4,
          followUpSeqNum: 2,
          dayNum: 10,
          daysTillNext: 5,
          clubId: undefined
        }
      ]
    },
    {
      customClubLabel: null,
      displayName: 'Expired Guest',
      followUpTab: '0',
      groupName: 'Prospect',
      hidden: 'false',
      id: '5',
      name: 'Expired Guest',
      schedules: [
        {
          autoEnabled: false,
          canEditSchedules: true,
          daysTillNext: 0,
          followUpSeqNum: 1,
          dayNum: 0,
          followUpStatus: 5,
          followUpType: 1,
          locationId: 4585
        }
      ]
    }
  ],
  type: 1
}]

export const deleteExpected = [
  {
    id: '0',
    name: 'Prospecting',
    statuses: [
      {
        customClubLabel: null,
        displayName: 'Active Guest',
        followUpTab: '0',
        groupName: 'Prospect',
        hidden: 'false',
        id: '4',
        name: 'Active Guest',
        schedules: [
          {
            autoEnabled: false,
            canEditSchedules: true,
            daysTillNext: 3,
            dayNum: 3,
            followUpSeqNum: 1,
            followUpStatus: 4,
            followUpType: 1,
            locationId: 4585,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 10,
                followUpStatus: 5,
                followUpType: 1,
                script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
              }
            ]
          }
        ]
      },
      {
        customClubLabel: null,
        displayName: 'Expired Guest',
        followUpTab: '0',
        groupName: 'Prospect',
        hidden: 'false',
        id: '5',
        name: 'Expired Guest',
        schedules: [
          {
            autoEnabled: false,
            canEditSchedules: true,
            daysTillNext: 0,
            followUpSeqNum: 1,
            dayNum: 0,
            followUpStatus: 5,
            followUpType: 1,
            locationId: 4585
          }
        ]
      }
    ],
    type: 1
  }
]

export const segmentsMock = [
  {
    segmentId: 1935,
    name: 'Test Segment',
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
    name: 'Test Segment I',
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
]

export const saveSegmentResMock = {
  segmentId: 1424,
  segmentName: 'Segment I',
  segmentAttributes: [
    { attributeId: 1425, attributeValue: 'Marketing-1', attributeType: 'Marketing Source' }
  ],
  createdAt: '2022-08-18T15:07:11Z',
  createdBy: 20,
  updatedAt: '2021-12-13T04:59:07Z',
  updatedBy: 123456,
  isDeleted: false
}

export const editSegmentResMock = {
  segmentId: 1935,
  segmentName: 'Test Segment edited',
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
}

export const marketingAttrsMock = {
  content: ['Buddy Referral', 'Bulk SMS Test', 'Club OS Booking Form', 'Corporate account', 'Direct mail', 'Drive By'],
  totalPages: 1
}

export const membershipAttrsMock = {
  content: [
    {
      membershipId: {
        clubId: 659,
        name: ' Space'
      },
      premium: 0,
      ignored: 0,
      excludeFromAnalytics: 0,
      student: 0,
      club: {
        id: 659,
        name: 'Club OS QA',
        timeZone: 'America/Los_Angeles'
      },
      memberManagementSystem: {
        id: 1,
        name: 'ABC DataTrak'
      }
    },
    {
      membershipId: {
        clubId: 659,
        name: 'Membership Type Filter'
      },
      premium: 0,
      ignored: 1,
      excludeFromAnalytics: 0,
      student: 0,
      club: {
        id: 659,
        name: 'Club OS QA',
        timeZone: 'America/Los_Angeles'
      },
      memberManagementSystem: {
        id: 1,
        name: 'ABC DataTrak'
      }
    }
  ],
  totalPages: 1
}

export const segmentsSnSResMock = [
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

export const state = {
  [key]: {
    loading: true,
    error: 'there is an error here',
    followups: [
      {
        id: '0',
        type: 1,
        name: 'Prospecting',
        statuses: [
          {
            id: '4',
            groupName: 'Prospect',
            customClubLabel: null,
            name: 'Active Guest',
            hidden: 'false',
            displayName: 'Active Guest',
            followUpTab: '0',
            schedules: [
              {
                locationId: 4585,
                followUpType: 1,
                followUpStatus: 4,
                followUpSeqNum: 1,
                dayNum: 3,
                daysTillNext: 3,
                autoEnabled: false,
                canEditSchedules: true,
                scripts: [
                  {
                    actionType: 1,
                    clubId: 659,
                    followUpSeqNum: 10,
                    followUpStatus: 5,
                    followUpType: 1,
                    script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
                  }
                ]
              },
              {
                locationId: 4585,
                followUpType: 1,
                followUpStatus: 4,
                followUpSeqNum: 2,
                dayNum: 5,
                daysTillNext: 2,
                autoEnabled: false,
                canEditSchedules: true
              }
            ]
          },
          {
            id: '5',
            groupName: 'Prospect',
            customClubLabel: null,
            name: 'Expired Guest',
            hidden: 'false',
            displayName: 'Expired Guest',
            followUpTab: '0',
            schedules: [
              {
                locationId: 4585,
                followUpType: 1,
                followUpStatus: 5,
                followUpSeqNum: 1,
                dayNum: 0,
                daysTillNext: 0,
                autoEnabled: false,
                canEditSchedules: true
              }
            ]
          }
        ]
      }
    ],
    touchpointCrud: {},
    segments: []
  },
  global: {
    selectedLocation: {
      name: 'Austin, TX',
      value: '4585',
      locationName: 'Austin, TX',
      locationId: 4585
    }
  }
}

const segmentsFollowups = [
  {
    id: '0',
    type: 1,
    name: 'Prospecting',
    statuses: [
      {
        id: '11',
        groupName: 'Prospect',
        customClubLabel: null,
        name: 'Web Lead',
        hidden: 'false',
        displayName: 'Web Lead',
        followUpTab: '0',
        segments: [
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
            isDeleted: false,
            followUpSchedules: [
              {
                segmentId: 1935,
                followUpType: 1,
                followUpStatus: 11,
                followUpSeqNum: 1,
                dayNum: 2,
                daysTillNext: 2,
                autoEnabled: false,
                scripts: [
                  {
                    segmentId: 1935,
                    actionType: 1,
                    clubId: 659,
                    followUpSeqNum: 1,
                    followUpStatus: 11,
                    followUpType: 1,
                    script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
                  }
                ]
              }
            ]
          }
        ],
        schedules: []
      }
    ]
  }
]

export const segmentsFollowupsNewExpected = [
  {
    id: '0',
    type: 1,
    name: 'Prospecting',
    statuses: [
      {
        id: '11',
        groupName: 'Prospect',
        customClubLabel: null,
        name: 'Web Lead',
        hidden: 'false',
        displayName: 'Web Lead',
        followUpTab: '0',
        segments: [
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
            isDeleted: false,
            followUpSchedules: [
              {
                segmentId: 1935,
                followUpType: 1,
                followUpStatus: 11,
                followUpSeqNum: 1,
                dayNum: 2,
                daysTillNext: 2,
                autoEnabled: false,
                scripts: [
                  {
                    segmentId: 1935,
                    actionType: 1,
                    clubId: 659,
                    followUpSeqNum: 1,
                    followUpStatus: 11,
                    followUpType: 1,
                    script: '<p>Hi {{first-name}}! This is {{employee-first}} at {{club-name}}.</p>'
                  }
                ]
              },
              {
                autoEnabled: false,
                clubId: 659,
                locationId: 4585,
                followUpType: 1,
                followUpStatus: 11,
                dayNum: 7,
                segmentId: 1935,
                followUpSeqNum: 2,
                daysTillNext: 5,
                displayName: undefined
              }
            ]
          }
        ],
        schedules: []
      }
    ]
  }
]

export const stateWithSegmentsFollowups = {
  [key]: {
    loading: true,
    error: 'there is an error here',
    followups: segmentsFollowups,
    touchpointCrud: {},
    segments: []
  },
  global: state.global
}
