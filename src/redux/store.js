import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { createInjectorsEnhancer } from './injector'

import globalReducer from './global/reducer'

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    ...injectedReducers,
    global: globalReducer
  })
  return rootReducer
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
  : compose

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  createReducer(),
  undefined,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    createInjectorsEnhancer({
      createReducer,
      runSaga: sagaMiddleware.run
    })
  )
)
