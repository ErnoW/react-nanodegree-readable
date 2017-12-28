import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCategory, fetchPosts, fetchCategories } from '../actions'
import PostSnippet from './PostSnippet'
import { PostType } from '../utils/PropTypes'

class App extends Component {
  // eslint-disable-line
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    currentPosts: PropTypes.arrayOf(PropTypes.string),
    selectCategory: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
  }

  static defaultProps = {
    posts: [],
    currentPosts: [],
  }

  render() {
    const categories = [
      {
        name: 'react',
        path: 'react',
      },
      {
        name: 'redux',
        path: 'redux',
      },
      {
        name: 'udacity',
        path: 'udacity',
      },
    ]

    return (
      <div className="App">
        <h1>Hello world</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                to={`/${category.path}`}
                onClick={() => {
                  this.props.fetchCategories()
                  this.props.selectCategory(category.name)
                  this.props.fetchPosts(category.name)
                }}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <ul>
          {this.props.currentPosts.map((postId) => (
            <li key={postId}>
              <PostSnippet post={this.props.posts[postId]} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    posts: state.entities.posts,
    currentPosts: state.currentPosts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App)
