import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import sagas from './sagas'
// import mockState from './mockState'

export default function configureStore ({ initialState, socket }) {
  const sagaMiddleware = createSagaMiddleware()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: ['UPDATE_PLAYER_STATE']
    })
    : compose
  const store = createStore(
    reducer,
    initialState,
    // mockState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  sagaMiddleware.run(sagas, socket)

  return store
}
