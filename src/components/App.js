import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCategory, fetchPosts, fetchCategories } from '../actions'
import PostSnippet from './PostSnippet'

class App extends Component {
  // eslint-disable-line
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

App.defaultProps = {
  posts: [],
  currentPosts: [],
  selectCategory: '',
}

App.propTypes = {
  posts: PropTypes.arrayOf({
    post: PropTypes.shape({
      author: PropTypes.string,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      commentCount: PropTypes.number,
      voteScore: PropTypes.number,
      timestamp: PropTypes.number.isRequired,
    }),
  }),
  currentPosts: PropTypes.arrayOf(PropTypes.string),
  selectCategory: PropTypes.string,
  fetchPosts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
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
