import { PhoneNumberUtil } from 'google-libphonenumber'
import { ERROR_MESSAGES } from '../global/messages'
import { objectIsEmpty, getPresentDay, removeTagsFromText, DYNAMIC_TAG_REGEX } from '.'

export const password = p => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8,}$/
  return !!p.match(regex)
}

export const email = e => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !!e.trim().match(regex)
}

export const number = n => {
  if (!n && n !== 0) return false
  return !Number.isNaN(n)
}

export const phone = p => {
  if (!p) return true
  const isPhoneNumber = !!p.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
  if (!isPhoneNumber || p.length < 3) return false
  const PhoneUtil = PhoneNumberUtil.getInstance()
  const number = PhoneUtil.parseAndKeepRawInput(p, 'US')
  return PhoneUtil.isValidNumber(number)
}

export const date = date => {
  const d = new Date(date)
  // eslint-disable-next-line
  return d.getTime() === d.getTime()
}

export const select = option => {
  if (!option) return false
  return !objectIsEmpty(option)
}

export const getErrorMessage = error => {
  if (!error) return ''

  if (error === 'required') return ERROR_MESSAGES.REQUIRED
  if (error === 'email') return ERROR_MESSAGES.EMAIL
  if (error === 'number') return ERROR_MESSAGES.NUMBER
  if (error === 'date') return ERROR_MESSAGES.DATE
  if (error === 'password') return ERROR_MESSAGES.PASSWORD
  if (error === 'phone') return ERROR_MESSAGES.PHONE
  if (error === 'needContact') return ERROR_MESSAGES.CONTACT
  if (error === 'locationSelect') return ERROR_MESSAGES.LOCATION
  if (error === 'time') return ERROR_MESSAGES.TIME

  return ERROR_MESSAGES.DEFAULT
}

export const checkSelect = ({ value }, key, required) => {
  if (required && value?.value === '') {
    return { error: getErrorMessage(key), validated: true }
  }
  return { error: '', validated: true }
}

export const checkAppointmentField = ({ name, value }, { time }) => {
  // if date value gets cleared, clear the value of the time and remove the error/validation
  if (name === 'date') {
    if (value === '' && !time.validated) return { error: '', validated: false }
    const appointmentDate = new Date(value)
    if ((value === '' && time.validated) || appointmentDate.getTime() < getPresentDay()) {
      return { error: getErrorMessage('date'), validated: true }
    }
  }
  if (name === 'time') {
    if (value.value === '') return { error: getErrorMessage('required'), validated: true }
  }
  return { error: '', validated: true }
}

export const checkField = ({ type, value, required, relatedField = null }) => {
  // throws an error if firstName and lastName fields are blank
  if (!value && required) return getErrorMessage('required')

  // throws an error if both email and phone fields are blank
  if (!value && relatedField && !relatedField.value) return getErrorMessage('needContact')

  // throws an error if the field is formatted incorrectly and the related field is blank
  if (value) {
    const valid = (() => {
      switch (type) {
        case 'email': return email(value)
        case 'phone': return phone(value)
        case 'number': return number(value)
        case 'password': return password(value)
        case 'date': return date(value)
        case 'select': return select(value)
        default:
          return true
      }
    })()
    return !valid ? getErrorMessage(type) : ''
  }

  return ''
}

const SCRIPT_IDS = [2, 3]
const SCRIPT_NAMES = { 2: 'Email', 3: 'SMS' }
const getScriptBodyError = (action, method) => {
  const actionName = SCRIPT_NAMES[action]
  const methodName = SCRIPT_NAMES[method]
  return `${actionName} script is required if preferred or fallback option is ${methodName}`
}

export const validateScriptBody = (scripts, { primaryAction, secondaryAction }) => {
  const selectedMethods = SCRIPT_IDS.filter(id => [primaryAction, secondaryAction].includes(id))
  if (!selectedMethods.length) return null
  const missingScripts = SCRIPT_IDS.filter(id => !scripts.find(s => s.actionType === id))
  const emptyScripts = scripts.reduce((acc, { actionType, script }) => {
    const text = removeTagsFromText(script)
    if (text.trim() || actionType === 1) return acc
    if (acc.includes(actionType)) return acc
    return acc.concat(actionType)
  }, missingScripts)
  if (!emptyScripts.length) return null
  const failingScripts = emptyScripts.filter(s => selectedMethods.includes(s))
  if (!failingScripts.length) return null
  const sortedFailingScripts = failingScripts.sort((a, b) => a - b)
  const failingMethod = selectedMethods.find(m => m === sortedFailingScripts[0]) || selectedMethods[0]
  return getScriptBodyError(sortedFailingScripts[0], failingMethod)
}

export const validateScriptTags = (text, dynamicTags) => {
  const existingTags = dynamicTags.reduce((acc, curr) => acc.concat(curr.options.map(({ value }) => value)), [])
  const foundTags = text.match(DYNAMIC_TAG_REGEX)
  const isTagOkRegex = /^(\{{2})([^{}]+)(\}{2})$/
  if (!foundTags) return []
  const tagsErrors = foundTags.reduce((acc, tag) => {
    const cleanTag = tag.replace(/\{|\}/g, '')
    if (!isTagOkRegex.test(tag)) return acc.concat(`Invalid dynamic content syntax, use {{${cleanTag}}} instead ${tag}`)
    if (existingTags.includes(tag)) return acc
    return acc.concat(`Invalid dynamic content name: ${cleanTag}`)
  }, [])

  return tagsErrors
}
