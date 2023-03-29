import { PERMISSION_KEYS, STATUSES_WITH_SEGMENTS } from './constants'

export const checkIfSegmentStatus = (type, id) => {
  const hasSegmentation = !!STATUSES_WITH_SEGMENTS.find(s => s.type === parseInt(type, 10) && s.id === parseInt(id, 10))
  return hasSegmentation
}

const setSchedulesDayNum = schedules => schedules.reduce(
  (acc, curr) => {
    const dayNum = curr.daysTillNext + acc.dayNum
    return { schedules: acc.schedules.concat({ ...curr, dayNum }), dayNum }
  },
  { dayNum: 0, schedules: [] }
).schedules

export const getStatusSegments = (type, id, segments) => {
  if (!checkIfSegmentStatus(type, id)) return []
  const currentStatus = segments.find(
    ({ followUpType, followUpStatus }) => followUpType === parseInt(type, 10) && followUpStatus === parseInt(id, 10)
  )
  if (!currentStatus) return []
  const { followUpSegments = [], followUpSchedules = [], followUpSegmentScripts = [] } = currentStatus
  return followUpSegments.map(segment => {
    const schedulesWithScripts = followUpSchedules.reduce((acc, schedule) => {
      if (segment.segmentId !== schedule.segmentId) return acc
      return acc.concat({
        ...schedule,
        scripts: followUpSegmentScripts.filter(
          script => script.followUpSeqNum === schedule.followUpSeqNum && script.segmentId === schedule.segmentId
        )
      })
    }, [])
    return { ...segment, followUpSchedules: setSchedulesDayNum(schedulesWithScripts) }
  })
}

export const sortSegments = segments => [...segments].sort((a, b) => a.name.localeCompare(b.name))

// Formatting club-os data into something usable
export const parseSnSData = (data, followUpSchedules, followUpScripts, segmentsData, isClub) => {
  const schedulesPermissions = followUpSchedules.permissions
  const scriptsPermissions = followUpScripts.permissions
  const schedules = isClub ? followUpSchedules : followUpSchedules.schedules
  const scripts = isClub ? followUpScripts : followUpScripts.scripts

  const group = (acc, curr) => {
    const { followUpStatus, followUpType } = curr
    const key = `${followUpStatus}-${followUpType}`
    if (acc[key]) acc[key].push(curr)
    else acc[key] = [curr]
    return acc
  }

  const sch = schedules.reduce(group, {})
  const scr = scripts.reduce(group, {})

  Object.keys(sch).forEach(key => { sch[key] = setSchedulesDayNum(sch[key]) })

  Object.keys(scr).forEach(key => {
    const scripts = scr[key]
    scripts.forEach(script => {
      const schedule = sch[key]?.find(el => el.followUpSeqNum === script.followUpSeqNum)
      if (!schedule) return
      if (schedule.scripts) schedule.scripts.push(script)
      else schedule.scripts = [script]
    })
  })

  const followups = data.map(el => {
    const { type, statuses, id } = el
    const canEditSchedules = isClub ? undefined : schedulesPermissions[PERMISSION_KEYS.SCHEDULES[type]]
    const canEditScripts = isClub ? undefined : scriptsPermissions[PERMISSION_KEYS.SCRIPTS[type]]
    const newStatuses = statuses.map(st => {
      const key = `${st.id}-${type}`
      const unsortedSegments = getStatusSegments(type, st.id, segmentsData)
      const segments = sortSegments(unsortedSegments)
      return { ...st, followUpTab: id, schedules: sch[key] || [], segments }
    })
    return { ...el, statuses: newStatuses, canEditSchedules, canEditScripts }
  })

  return {
    followups,
    canEditSchedules: followups[0].canEditSchedules,
    canEditScripts: followups[0].canEditScripts
  }
}

export const getSchedulesByDay = (schedules, dayNum, order) => {
  const { earlierSch, sameDaySch, laterSch } = schedules.reduce(
    (acc, sch) => {
      if (sch.dayNum < dayNum) acc.earlierSch = acc.earlierSch.concat(sch)
      if (sch.dayNum === dayNum) acc.sameDaySch = acc.sameDaySch.concat(sch)
      if (sch.dayNum > dayNum) acc.laterSch = acc.laterSch.concat(sch)
      return acc
    },
    { earlierSch: [], sameDaySch: [], laterSch: [] }
  )
  return {
    earlierSch: order === 'first' ? earlierSch : earlierSch.concat(sameDaySch),
    laterSch: order === 'first' ? sameDaySch.concat(laterSch) : laterSch
  }
}

export const getCurrentSchedules = (segmentId, status) => {
  if (!segmentId) return status.schedules
  return status.segments.find(segment => segment.segmentId === segmentId).followUpSchedules
}

export const getStatus = (followups, type, status) => {
  const fs = followups.filter(f => f.type === type)
  if (!fs.length) return null

  let st = null
  for (let i = 0; i < fs.length; i++) {
    st = fs[i].statuses.find(s => s.id === `${status}`)
    if (st) break
  }
  return st
}

export const setFollowUpStatusValue = (followUps, status, value) => {
  const newFollowups = followUps.map(followUp => {
    if (followUp.id !== status.followUpTab) return followUp
    const newStatuses = followUp.statuses.map(st => {
      if (st.id !== status.id) return st
      return { ...st, ...value }
    })
    return { ...followUp, statuses: newStatuses }
  })
  return newFollowups
}

export const setFollowUpScripts = (followUps, { followUpType, followUpStatus }, scriptsData, segmentId) => {
  const status = getStatus(followUps, followUpType, followUpStatus)
  const currentSchedules = getCurrentSchedules(segmentId, status)
  const schedules = currentSchedules.map(schedule => {
    if (schedule.followUpSeqNum !== scriptsData.followUpSeqNum) return schedule
    return scriptsData
  })
  const statusValueToUpdate = !segmentId
    ? { schedules }
    : {
      segments: status.segments.map(
        segment => (segment.segmentId !== segmentId ? segment : { ...segment, followUpSchedules: schedules }) // eslint-disable-line max-len
      )
    }
  return setFollowUpStatusValue(followUps, status, statusValueToUpdate)
}

export const updateTouchpointInFollowups = (followUps, tp, data) => {
  const { followUpType, followUpStatus, followUpSeqNum } = tp
  const status = getStatus(followUps, followUpType, followUpStatus)
  const newSchedules = status.schedules.map(sch => {
    if (sch.followUpSeqNum !== followUpSeqNum) return sch
    const newSch = { ...sch, ...data }
    return newSch
  })
  return setFollowUpStatusValue(followUps, status, { schedules: newSchedules })
}
