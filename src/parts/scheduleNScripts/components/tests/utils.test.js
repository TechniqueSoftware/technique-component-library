import { parseTitle } from '../segments/utils'
import {
  checkIfAttributeIsInUse,
  parseAttributes,
  unparseAttributes
} from '../utils'

import { FOLLOWUP_STATUS } from '../segments/constants'

import { segmentsMock } from './mock'

const selectedAttributesMock = [
  { name: 'Twitter Ad', value: 'Twitter Ad' },
  { name: 'Marketing S', value: 'Marketing S' }
]

const attributesMock = [
  { attributeValue: selectedAttributesMock[0].value, attributeType: 'Marketing Source' },
  { attributeValue: selectedAttributesMock[1].value, attributeType: 'Marketing Source' }
]

describe('segments', () => {
  describe('checkIfAttributeIsInUse', () => {
    it('throws true if an attribute is currently used by an existing segment', () => {
      const valueToCheck = segmentsMock[0].segmentAttributes[0].attributeValue
      const isInUse = checkIfAttributeIsInUse(segmentsMock, selectedAttributesMock, valueToCheck)
      expect(isInUse).toBe(true)
    })
    it('throws true if an attribute is currently used by another selected value', () => {
      const isInUse = checkIfAttributeIsInUse(segmentsMock, selectedAttributesMock, selectedAttributesMock[0].value)
      expect(isInUse).toBe(true)
    })
    it('throws false if an attribute is not currently used', () => {
      const isInUse = checkIfAttributeIsInUse(segmentsMock, selectedAttributesMock, 'Newells')
      expect(isInUse).toBe(false)
    })
  })

  describe('parseAttributes', () => {
    const result = parseAttributes(selectedAttributesMock, 'Marketing Source')
    expect(result).toEqual(attributesMock)
  })

  describe('unparseAttributes', () => {
    const result = unparseAttributes(attributesMock)
    expect(result).toEqual(selectedAttributesMock)
  })
})

describe('copySegments', () => {
  describe('parseTitle', () => {
    it('return Web Lead when follow up status is 11', () => {
      expect(parseTitle(FOLLOWUP_STATUS.WEB_LEAD)).toBe('Web Lead')
    })
    it('return Appt booked when follow up status is 2 ', () => {
      expect(parseTitle(FOLLOWUP_STATUS.APPT_BOOKED)).toBe('Appt Booked')
    })
    it('return Member when follow up status is 6', () => {
      expect(parseTitle(FOLLOWUP_STATUS.MEMBER)).toBe('Member')
    })
  })
})
