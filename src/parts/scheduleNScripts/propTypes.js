import PropTypes from 'prop-types'

export const scriptPropTypes = PropTypes.shape({
  clubId: PropTypes.number,
  followUpType: PropTypes.number,
  followUpStatus: PropTypes.number,
  followUpSeqNum: PropTypes.number,
  script: PropTypes.string,
  emailSubject: PropTypes.string,
  actionType: PropTypes.number
})

export const schedulePropTypes = PropTypes.shape({
  clubId: PropTypes.number,
  followUpType: PropTypes.number,
  followUpStatus: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  followUpSeqNum: PropTypes.number,
  daysTillNext: PropTypes.number,
  autoEnabled: PropTypes.bool,
  primaryAction: PropTypes.number,
  secondaryAction: PropTypes.number,
  followUpTime: PropTypes.string,
  followUpMinutes: PropTypes.any,
  scripts: PropTypes.arrayOf(scriptPropTypes)
})

export const statusPropTypes = PropTypes.shape({
  id: PropTypes.string,
  groupname: PropTypes.string,
  customClubLabel: PropTypes.string,
  name: PropTypes.string,
  hidden: PropTypes.string,
  shcedules: PropTypes.arrayOf(schedulePropTypes)
})

export const segmentPropTypes = PropTypes.shape({
  clubId: PropTypes.number,
  followUpType: PropTypes.number,
  followUpStatus: PropTypes.number,
  followUpSegments: PropTypes.arrayOf(
    PropTypes.shape({
      segmentId: PropTypes.number,
      name: PropTypes.string,
      followUpSchedules: schedulePropTypes
    })
  )
})
