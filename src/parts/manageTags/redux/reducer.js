import { produce } from 'immer'

import TYPES from './types'

export const initialState = {
  tagsList: []
}

const reducer = (state = initialState, { type, payload }) => produce(state, draft => {
  switch (type) {
    case TYPES.DATA.SET:
      draft.tagsList = payload
      break
  }
})

export default reducer
