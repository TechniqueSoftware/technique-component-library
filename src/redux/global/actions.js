import { USER, CLUB, LOCATIONS, LOADING, DATA, PERMISSIONS, DYNAMIC_TAGS } from './types'

const LOADING_ACTIONS = {
  FINISHED: () => ({ type: LOADING.FINISHED })
}

const USER_ACTIONS = {
  SET_LOGGED_IN: payload => ({ type: USER.SET_LOGGED_IN, payload }),
  SET_DELEGATED: payload => ({ type: USER.SET_DELEGATED, payload }),
  GET: payload => ({ type: USER.GET, payload }),
  SUCCESS: payload => ({ type: USER.SUCCESS, payload }),
  ERROR: payload => ({ type: USER.ERROR, payload }),
  CLEAR: () => ({ type: USER.CLEAR })
}

const CLUB_ACTIONS = {
  SET: payload => ({ type: CLUB.SET, payload }),
  GET: payload => ({ type: CLUB.GET, payload }),
  SUCCESS: payload => ({ type: CLUB.SUCCESS, payload }),
  ERROR: payload => ({ type: CLUB.ERROR, payload }),
  CLEAR: () => ({ type: CLUB.CLEAR })
}

const LOCATIONS_ACTIONS = {
  SET_ALL: payload => ({ type: LOCATIONS.SET_ALL, payload }),
  GET: payload => ({ type: LOCATIONS.GET, payload }),
  SUCCESS: payload => ({ type: LOCATIONS.SUCCESS, payload }),
  ERROR: payload => ({ type: LOCATIONS.ERROR, payload }),
  CLEAR: () => ({ type: LOCATIONS.CLEAR }),
  SELECT: payload => ({ type: LOCATIONS.SELECT, payload }),
  SET: payload => ({ type: LOCATIONS.SET, payload })
}

const DATA_ACTIONS = {
  GET: payload => ({ type: DATA.GET, payload }),
  SUCCESS: payload => ({ type: DATA.SUCCESS, payload }),
  ERROR: payload => ({ type: DATA.ERROR, payload }),
  CLEAR: () => ({ type: DATA.CLEAR })
}

const PERMISSIONS_ACTIONS = {
  SET: payload => ({ type: PERMISSIONS.SET, payload }),
  CLEAR: () => ({ type: PERMISSIONS.CLEAR })
}

const DYNAMIC_TAGS_ACTIONS = {
  GET: payload => ({ type: DYNAMIC_TAGS.GET, payload }),
  SET: payload => ({ type: DYNAMIC_TAGS.SET, payload })
}

export default {
  LOADING: LOADING_ACTIONS,
  USER: USER_ACTIONS,
  CLUB: CLUB_ACTIONS,
  LOCATIONS: LOCATIONS_ACTIONS,
  DATA: DATA_ACTIONS,
  PERMISSIONS: PERMISSIONS_ACTIONS,
  DYNAMIC_TAGS: DYNAMIC_TAGS_ACTIONS
}
