import { createManager } from '@redux/injector'

import reducer from './reducer'
import { key } from './types'
import saga from './sagas'

export { default as GLOBAL_REDUCER } from './reducer'
export { default as GLOBAL_SELECTOR } from './selectors'
export { default as GLOBAL_ACTIONS } from './actions'
export { key, TYPES } from './types'

export const Manager = createManager({
  name: 'GlobalManager',
  key,
  reducer,
  saga
})
