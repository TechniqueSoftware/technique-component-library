import axios from 'axios'
import humps from 'humps'

import { getCookie } from '@utils'
import {
  API_V3_DOMAIN,
  API_V3_ACCESS_TOKEN_NAME,
  API_V3_ID_TOKEN_NAME,
  CONTEXT_PATH
} from './constants'

const Axios = axios.create({
  baseURL: API_V3_DOMAIN,
  headers: {
    'Content-Type': 'application/json'
  },
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ]
})

const refreshApiToken = async () => axios.get(`${CONTEXT_PATH}/action/Login/refresh-api-v3-access-token`, {
  // window.ACCESS_TOKEN used to refresh API V3 apiV3AccessToken and apiV3IdToken cookies.
  // The above axios.get does not call api.club-os.io
  headers: {
    Authorization: `Bearer ${window.ACCESS_TOKEN}`
  }
})

const getApiV3Tokens = async () => {
  let accessToken = getCookie(API_V3_ACCESS_TOKEN_NAME, document.cookie)
  let idToken = getCookie(API_V3_ID_TOKEN_NAME, document.cookie)

  if (!idToken || !accessToken) {
    await refreshApiToken()
    accessToken = getCookie(API_V3_ACCESS_TOKEN_NAME, document.cookie)
    idToken = getCookie(API_V3_ID_TOKEN_NAME, document.cookie)
  }

  if (!idToken || !accessToken) {
    throw Error('Invalid API V3 accessToken')
  }
  return { idToken, accessToken }
}

Axios.interceptors.request.use(
  async config => {
    try {
      const { accessToken, idToken } = await getApiV3Tokens()
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers['ID-TOKEN'] = idToken
      return config
    } catch (err) {
      return config
    }
  },
  error => {
    throw error
  }
)

Axios.interceptors.response.use(
  response => response.data,
  error => {
    throw error.response.data
  }
)

export default Axios
