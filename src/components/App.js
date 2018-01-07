import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { fetchCategories } from '../actions'
import Navigation from './Navigation'
import PostList from './PostList'

class App extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    initialLoading: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        {this.props.initialLoading === true && <p>Loading...</p>}
        <Navigation />
        <hr />
        {this.props.initialLoading === false && (
          <Route path="/category/:category" component={PostList} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialLoading: state.initialLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
