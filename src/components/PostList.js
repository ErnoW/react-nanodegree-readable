import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import PostSnippet from './PostSnippet'
import { fetchPosts } from '../actions'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    filteredPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    fetchPosts: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    filteredPosts: [],
    posts: [],
  }

  componentDidMount() {
    this.props.fetchPosts(this.props.match.params.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.fetchPosts(this.props.match.params.category)
    }
  }

  render() {
    let postList = null
    if (
      this.props.match.params.category &&
      this.props.filteredPosts[this.props.match.params.category]
    ) {
      postList = (
        <ul>
          {this.props.filteredPosts[this.props.match.params.category].map(
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

const mapStatetoProps = (state) => ({
  posts: state.entities.posts,
  filteredPosts: state.filteredPosts,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (category) => dispatch(fetchPosts(category)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostList)
