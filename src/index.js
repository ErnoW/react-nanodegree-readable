import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import App from './components/App'
import configureStore, { history } from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
