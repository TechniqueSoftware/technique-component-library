/* eslint-disable prefer-destructuring */
export const APP_ENV = process.env.APP_ENV
export const ASF_IFRAME_SRC = process.env.ASF_IFRAME_SRC
export const APP_TEST_USER = process.env.APP_TEST_USER

export const IS_PROD = APP_ENV === 'production'
export const IS_DEV = APP_ENV === 'development'
