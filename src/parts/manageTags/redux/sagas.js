import { call, put, select, takeLatest } from 'redux-saga/effects'
import axios from '@axios'

import SELECTORS from './selectors'
import ACTIONS from './actions'
import TYPES from './types'

export const apiCalls = {
  // eslint-disable-next-line max-len
  getTemplateTags: () => axios.get('/marketing/email-campaigns/template-tag'),
  saveTags: payload => axios.post('/marketing/email-campaigns/template-tag', payload) // eslint-disable-line max-len
}

export function* saveTags ({ payload }) {
  try {
    const tagsList = yield select(SELECTORS.TAGS)
    const { newTagValue } = payload
    const newTagAPIData = { tagName: newTagValue }
    const newTag = yield call(apiCalls.saveTags, newTagAPIData)
    yield put(ACTIONS.DATA.SET([...tagsList, { ...newTag, tagTemplates: [] }]))
  } catch (err) {
    console.log(err)
  }
}

export function* getTags () {
  try {
    const tagsList = yield call(apiCalls.getTemplateTags)
    yield put(ACTIONS.DATA.SET(tagsList.content))
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
  }
}

export default function* saga () {
  yield takeLatest(TYPES.DATA.REQUEST_TAGS, getTags)
  yield takeLatest(TYPES.DATA.SAVE_TAGS, saveTags)
}
