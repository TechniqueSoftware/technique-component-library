export const key = 'global'

export const DATA = {
  GET: `${key}/DATA/GET`,
  SUCCESS: `${key}/DATA/SUCCESS`,
  ERROR: `${key}/DATA/ERROR`,
  CLEAR: `${key}/DATA/CLEAR`
}

export const LOADING = {
  FINISHED: `${key}/LOADING/FINISHED`
}

export const USER = {
  SET_LOGGED_IN: `${key}/USER/SET_LOGGED_IN`,
  SET_DELEGATED: `${key}/USER/SET_DELEGATED`,
  GET: `${key}/USER/GET`,
  SUCCESS: `${key}/USER/SUCCESS`,
  ERROR: `${key}/USER/ERROR`,
  CLEAR: `${key}/USER/CLEAR`
}

export const CLUB = {
  SET: `${key}/CLUB/SET`,
  GET: `${key}/CLUB/GET`,
  SUCCESS: `${key}/CLUB/SUCCESS`,
  ERROR: `${key}/CLUB/ERROR`,
  CLEAR: `${key}/CLUB/CLEAR`
}

export const LOCATIONS = {
  SET_ALL: `${key}/LOCATIONS/SET_ALL`,
  GET: `${key}/LOCATIONS/GET`,
  SUCCESS: `${key}/LOCATIONS/SUCCESS`,
  ERROR: `${key}/LOCATIONS/ERROR`,
  CLEAR: `${key}/LOCATIONS/CLEAR`,
  SELECT: `${key}/LOCATIONS/SELECT`,
  SET: `${key}/LOCATIONS/SET`
}

export const PERMISSIONS = {
  SET: `${key}/PERMISSIONS/SET`,
  CLEAR: `${key}/PERMISSIONS/CLEAR`
}

export const DYNAMIC_TAGS = {
  GET: `${key}/DYNAMICTAGS/GET`,
  SET: `${key}/DYNAMICTAGS/SET`
}

export const TYPES = {
  LOADING,
  USER,
  CLUB,
  LOCATIONS,
  DATA,
  PERMISSIONS,
  DYNAMIC_TAGS
}
