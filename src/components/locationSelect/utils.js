export const urlClubIdRegex = id => new RegExp(`^.*\/${id}(\/)?(#)?(((\/)?(#){1}){1}([0-9a-zA-Z])+?)*?$`, 'gm') // eslint-disable-line no-useless-escape, max-len
const urlLocationIdRegex = id => new RegExp(`^.*\/${id}\/`, 'gm') // eslint-disable-line no-useless-escape

export const getLocationIdFromUrl = (path, clubId) => {
  try {
    const [urlBeginning] = path.match(urlLocationIdRegex(clubId))
    const locationId = path.substring(urlBeginning.length).replace(/[^0-9]/g, '')
    return locationId ? parseInt(locationId, 10) : null
  } catch (err) {
    return null
  }
}
