import { createManager } from '@redux/injector'

import reducer from './reducer'
import { key } from './types'
import saga from './sagas'

export { default as REDUCER } from './reducer'
export { default as ACTIONS } from './actions'
export { default as SELECTORS } from './selectors'
export { key, default as TYPES } from './types'

export const Manager = createManager({
  name: 'NewPhoneInquiryManager',
  key,
  reducer,
  saga
})
