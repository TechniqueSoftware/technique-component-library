import moment from 'moment-timezone'

const zoneNameMap = {
  HST: 'Hawaii Standard Time',
  EST: 'Eastern Standard Time',
  EDT: 'Eastern Daylight Time',
  CST: 'Central Standard Time',
  CDT: 'Central Daylight Time',
  MST: 'Mountain Standard Time',
  MDT: 'Mountain Daylight Time',
  PST: 'Pacific Standard Time',
  PDT: 'Pacific Daylight Time',
  '+03': 'East Africa Time'
}

export function getZoneName () {
  const abbr = this.zoneAbbr()
  return zoneNameMap[abbr] || abbr
}

export function modifyMomentZoneNameMethodToUseZoneNameMap () {
  moment.fn.zoneName = getZoneName
}
