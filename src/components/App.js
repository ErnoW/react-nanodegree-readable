import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts, fetchCategories } from '../actions'
import Navigation from './Navigation'
import PostList from './PostList'

class App extends Component {
  // eslint-disable-line
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <h1>Hello world</h1>
        <Navigation />
        <hr />
        <PostList />
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    posts: state.entities.posts,
    filteredPosts: state.filteredPosts,
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App)
