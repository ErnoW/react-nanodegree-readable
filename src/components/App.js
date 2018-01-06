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
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <hr />
        <Route path="/category/:category" component={PostList} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.entities.posts,
  filteredPosts: state.filteredPosts,
  categories: state.categories,
  selectedCategory: state.selectedCategory,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
