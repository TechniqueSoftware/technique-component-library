export const TP_ACTION_TYPES = {
  CALL: 1,
  EMAIL: 2,
  TEXT: 3
}

export const SCRIPT_TABNAME = [{
  id: '1',
  name: 'Call',
  className: 'BsTelephone'
}, {
  id: '2',
  name: 'Email',
  className: 'BsEnvelope'
}, {
  id: '3',
  name: 'Text',
  className: 'BsChatDots'
}]

export const SEGMENT_TABNAME = [
  {
    id: '0',
    name: 'Manage Segments'
  },
  {
    id: '1',
    name: 'Copy Segments'
  }
]

export const SNACKBAR_MESSAGES = {
  NEW_SUCCESS: 'Touchpoint has been created successfully!',
  EDIT_SUCCESS: 'Touchpoint has been updated!',
  DELETE_SUCCESS: 'Touchpoint has been deleted successfully!',
  SCRIPT_SUCCESS: 'Script has been saved successfully!',
  SEGMENT_NEW: 'Segment has been created successfully!',
  SEGMENT_EDIT: 'Changes for this segment have been saved successfully!',
  SEGMENT_DELETE: 'Segment has been deleted successfully!'
}

export const STATUSES_WITH_SEGMENTS = [
  { type: 1, id: 11, attributeType: 'Marketing Source', attributeId: 'marketing' }, // Prospecting -> Web Lead
  { type: 1, id: 2, attributeType: 'Marketing Source', attributeId: 'marketing' }, // Prospecting -> Appt Booked
  { type: 1, id: 6, attributeType: 'Membership Type', attributeId: 'membership' } // Member -> Member
]

export const PERMISSION_KEYS = {
  SCHEDULES: {
    1: 'canEditMemberSalesSchedules',
    2: 'canEditPtSchedules',
    3: 'canEditStudioSchedules'
  },
  SCRIPTS: {
    1: 'canEditMemberSalesScripts',
    2: 'canEditPtScripts',
    3: 'canEditStudioScripts'
  }
}
