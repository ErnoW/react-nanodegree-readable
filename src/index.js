import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

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
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger)),
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
