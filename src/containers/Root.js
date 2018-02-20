import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import App from 'containers/App'

// $FlowFixMe: store and history
const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

export default Root
