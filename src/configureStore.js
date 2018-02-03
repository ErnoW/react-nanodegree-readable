import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import { callAPIMiddleware } from './utils/api'

export const history = createHistory()

const configureStore = () => {
  const rrrMiddleware = routerMiddleware(history)
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const logger = (store) => (next) => (action) => {
    console.group(action.type) // eslint-disable-line
    console.info('dispatching', action) // eslint-disable-line
    const result = next(action)
    console.log('next state', store.getState()) // eslint-disable-line
    console.groupEnd(action.type) // eslint-disable-line
    return result
  }

  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        callAPIMiddleware,
        rrrMiddleware,
        logger,
      ),
    ),
  )

  // Hot reloading
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(reducers)
      })
    }
  }

  return store
}

export default configureStore
