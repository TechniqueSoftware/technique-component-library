export const script = {
  actionType: 1,
  clubId: 659,
  followUpSeqNum: 5,
  followUpStatus: 6,
  followUpType: 1,
  script: '<p>This is test script</p>'
}

export const data = {
  autoEnabled: false,
  clubId: 659,
  daysTillNext: 72,
  dayNum: 166,
  followUpSeqNum: 5,
  followUpStatus: 6,
  followUpType: 1,
  rowName: 'Member',
  locationId: undefined,
  scripts: [script]
}

export const locationState = [
  {
    locationId: 4559,
    locationName: 'Philadelphia, PA'
  }
]

export const dynamicTagState = [
  {
    name: 'Recipient',
    options: [
      {
        name: 'First Name',
        value: '{{recipient-first}}'
      }
    ]
  }
]

export const segmentsMock = [
  {
    segmentId: 1421,
    name: 'Segment test 1',
    segmentAttributes: [
      { attributeId: 1422, attributeValue: 'Facebook Ad', attributeType: 'Marketing Source' }
    ],
    createdAt: '2022-08-18T15:07:11Z',
    createdBy: 20,
    updatedAt: '2021-12-13T04:59:07Z',
    updatedBy: 123456,
    isDeleted: false
  },
  {
    segmentId: 1422,
    name: 'Segment test 2',
    segmentAttributes: [
      { attributeId: 1423, attributeValue: 'Instagram Ad', attributeType: 'Marketing Source' }
    ],
    createdAt: '2022-08-18T15:07:11Z',
    createdBy: 20,
    updatedAt: '2021-12-13T04:59:07Z',
    updatedBy: 123456,
    isDeleted: false
  }
]
