export const followUpTimeToObject = followUpTime => {
  const getHour = h => {
    if (h === '00') return 12
    const parsedHour = parseInt(h, 10)
    return parsedHour > 12 ? parsedHour - 12 : parsedHour
  }
  const time = followUpTime.split(':')
  const [oldHour, oldMinute] = time
  const hour = getHour(oldHour)
  const minute = parseInt(oldMinute, 10)
  const meridiem = oldHour >= 12 ? 'PM' : 'AM'
  return { hour, minute, meridiem }
}

export const objectToFollowUpTime = (hour, minute, meridiem) => {
  const parseHour = h => meridiem === 'PM' ? parseInt(h, 10) + 12 : h
  return `${parseHour(hour === 12 ? '00' : hour)}:${minute === 0 ? '00' : minute}:00`
}
