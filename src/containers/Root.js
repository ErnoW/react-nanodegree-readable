import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { ConnectedRouter as Router } from 'react-router-redux'
import App from '../containers/App'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
