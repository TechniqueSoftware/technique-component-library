import { IS_PROD } from '@global/env'

const API_V3_DOMAIN = window.IS_PROD ? 'https://api.club-os.io' : 'https://test-api.club-os.io'
const API_V3_ACCESS_TOKEN_NAME = 'apiV3AccessToken'
const API_V3_ID_TOKEN_NAME = 'apiV3IdToken'

// const CONTEXT_PATH = IS_PROD ? window.CONTEXT_PATH : 'https://test-api.club-os.io'
const CONTEXT_PATH = IS_PROD ? window.CONTEXT_PATH : window.location.origin

export {
  API_V3_DOMAIN,
  API_V3_ACCESS_TOKEN_NAME,
  API_V3_ID_TOKEN_NAME,
  CONTEXT_PATH
}
