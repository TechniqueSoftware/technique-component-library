import { createSelector } from 'reselect'
import { get } from 'lodash'

import { key } from './types'
import { initialState } from './reducer'

const reducer = state => get(state, key, initialState)

const getTags = createSelector(
  reducer, state => get(state, 'tagsList', [])
)

export default {
  TAGS: getTags
}
