import { FOLLOWUP_STATUS } from './constants'

export const parseTitle = followUpStatus => {
  switch (followUpStatus) {
    case FOLLOWUP_STATUS.WEB_LEAD:
      return 'Web Lead'
    case FOLLOWUP_STATUS.APPT_BOOKED:
      return 'Appt Booked'
    case FOLLOWUP_STATUS.MEMBER:
      return 'Member'
  }
}

export const parseLocations = segmentLocations => segmentLocations.map(({ locationName, locationId }) => ({
  label: `${locationName}`,
  value: locationId
}))

export const checkPermission = userPermission => userPermission.some(
  element => element.permissionName === 'CopySegmentsAction' && element.permissionEffect === 'ALLOW')
