import { runSaga } from 'redux-saga'

const recordSaga = async ({ saga, payload, state }) => {
  const dispatched = []

  const store = {
    dispatch: action => dispatched.push(action)
  }
  if (state) store.getState = () => state

  await runSaga(
    store,
    saga,
    { payload }
  ).toPromise()
  return dispatched
}

export default recordSaga
