import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import configureStore, { history } from './configureStore'
import Root from './containers/Root'

const store = configureStore()

var root = document.getElementById('root')
if (root === null) {
  throw new Error('Could not find root')
}

ReactDOM.render(<Root store={store} history={history} />, root)

// Hot reloading
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    ReactDOM.render(<Root store={store} history={history} />, root)
  })
}

registerServiceWorker()
