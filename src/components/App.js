import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { fetchCategories } from '../actions'
import Navigation from './Navigation'
import PostList from './PostList'
import Post from './Post'
import NewPost from './NewPost'

class App extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    initialLoading: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.fetchCategories()
  }

  //TODO: improve loading state to include whole app
  render() {
    if (this.props.initialLoading === true) {
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <div className="App">
          <Navigation />
          <hr />
          <Route path="/category/:category" component={PostList} />
          <Route path="/post/:id" component={Post} />
          <Route path="/newpost" component={NewPost} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  initialLoading: state.initialLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
