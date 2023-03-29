import axios from '@axios'

export const copySegments = async body => {
  await axios.put('/settings/copy-segments/in-process', { userId: body.userId, copyInProcess: true })
  await axios.put('/settings/copy-segments', body)
}
