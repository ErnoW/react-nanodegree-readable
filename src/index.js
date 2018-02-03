import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import configureStore, { history } from './configureStore'
import Root from './containers/Root'

const store = configureStore()

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
)

// Hot reloading
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    ReactDOM.render(
      <Root store={store} history={history} />,
      document.getElementById('root'),
    )
  })
}

registerServiceWorker()
