import { followUpTimeToObject, objectToFollowUpTime } from '../utils'

const time24h = '00:00:00'
const convertedHour = { hour: 12, meridiem: 'AM', minute: 0 }

describe('parse string to object/ object to string ', () => {
  it('should parse string tome to object ', () => {
    const time = followUpTimeToObject(time24h)
    expect(time).toStrictEqual(convertedHour)
  })

  it('should parse object to string', () => {
    const hourformat = objectToFollowUpTime(convertedHour.hour, convertedHour.minute, convertedHour.meridiem)
    expect(hourformat).toStrictEqual(time24h)
  })
})
