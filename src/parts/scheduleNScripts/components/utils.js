import { STATUSES_WITH_SEGMENTS } from '@parts/scheduleNScripts/constants'
// SEGMENTS
export const checkIfAttributeIsInUse = (segments, selectedAttributes, valueToCheck, segmentId) => {
  if (valueToCheck === '') return false
  const listToCheck = segments.reduce(
    (acc, segment) => {
      if (segmentId && segment.segmentId === segmentId) return acc
      return acc.concat(segment.segmentAttributes)
    },
    selectedAttributes.map(({ value }) => ({ attributeValue: value }))
  )
  return !!listToCheck.find(({ attributeValue }) => attributeValue === valueToCheck)
}

export const getSegmentStatusProp = ({ followUpType, followUpStatus }, keyword) => {
  const segmentTp = STATUSES_WITH_SEGMENTS.find(
    s => s.type === parseInt(followUpType, 10) && s.id === parseInt(followUpStatus, 10)
  )
  return segmentTp?.[keyword]
}

export const parseAttributes = (attributes, type) => attributes.reduce((acc, attr) => {
  if (!attr.value) return acc
  return acc.concat({ attributeValue: attr.value, attributeType: type, attributeId: attr.id })
}, [])

export const unparseAttributes = attributes => attributes.map(({ attributeValue, attributeId }) => ({
  name: attributeValue,
  value: attributeValue,
  id: attributeId
}))
