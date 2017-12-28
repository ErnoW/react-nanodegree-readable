import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import {
  ConnectedRouter as Router,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux'

import { Provider } from 'react-redux'
import reducers from './reducers'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const history = createHistory()
const rrrMiddleware = routerMiddleware(history)

const logger = (store) => (next) => (action) => {
  console.group(action.type) // eslint-disable-line
  console.info('dispatching', action) // eslint-disable-line
  const result = next(action)
  console.log('next state', store.getState()) // eslint-disable-line
  console.groupEnd(action.type) // eslint-disable-line
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware, rrrMiddleware, logger)),
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
