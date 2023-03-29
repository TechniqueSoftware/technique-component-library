import TYPES from './types'

const DATA_ACTIONS = {
  SET: payload => ({ type: TYPES.DATA.SET, payload }),

  REQUEST_TAGS: payload => ({ type: TYPES.DATA.REQUEST_TAGS, payload }),
  SAVE_TAGS: payload => ({ type: TYPES.DATA.SAVE_TAGS, payload }),
  DELETE_TAGS: payload => ({ type: TYPES.DATA.DELETE_TAGS, payload })
}

export default {
  DATA: DATA_ACTIONS
}
