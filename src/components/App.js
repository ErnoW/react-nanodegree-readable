import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { loadCategories } from '../actions'
import Navigation from './Navigation'
import PostList from './PostList'
import Post from './Post'
import NewPost from './NewPost'
import { CategoryType } from '../utils/PropTypes'

class App extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(CategoryType).isRequired,
  }

  componentWillMount() {
    this.props.loadCategories()
  }

  //TODO: improve loading state to include whole app
  render() {
    if (!this.props.categories || this.props.categories.length === 0) {
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
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
