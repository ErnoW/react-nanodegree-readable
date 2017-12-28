import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import PostSnippet from './PostSnippet'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    filteredPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    selectedCategory: PropTypes.string,
  }

  static defaultProps = {
    filteredPosts: [],
    posts: [],
    selectedCategory: '',
  }

  render() {
    let postList = null
    if (
      this.props.selectedCategory &&
      this.props.filteredPosts[this.props.selectedCategory]
    ) {
      postList = (
        <ul>
          {this.props.filteredPosts[this.props.selectedCategory].map(
            (postId) => (
              <li key={postId}>
                <PostSnippet post={this.props.posts[postId]} />
              </li>
            ),
          )}
        </ul>
      )
    }

    return <div>{postList}</div>
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

export default connect(mapStatetoProps, null)(PostList)
