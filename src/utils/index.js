const DYNAMIC_TAG_REGEX = /\{([^}]+)(\}+)/g
const arrayIsEmpty = array => !Array.isArray(array) || !array.length
const objectIsEmpty = object => !Object.keys(object).length
const removeTagsFromText = content => content.replace(/<\/?[^>]+(>|$)/g, '')
const decapitalize = string => `${string.substring(0, 1).toLowerCase()}${string.substring(1)}`

const getCookie = (name, cookieString) => {
  const value = `; ${cookieString}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const getPresentDay = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) * 86400000
}

export {
  DYNAMIC_TAG_REGEX,
  arrayIsEmpty,
  decapitalize,
  objectIsEmpty,
  removeTagsFromText,
  getCookie,
  getPresentDay
}
