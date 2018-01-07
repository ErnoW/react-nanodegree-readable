import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import PostSnippet from './PostSnippet'
import { fetchPosts } from '../actions'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    fetchedPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    fetchPosts: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    fetchedPosts: [],
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
    const { posts, fetchedPosts, isFetching, hasError } = this.props
    const category = this.props.match.params.category

    let filteredPosts = []
    if (fetchedPosts[category]) {
      filteredPosts = fetchedPosts[category]
    }

    return (
      <div>
        {hasError && <p>Error</p>}
        {isFetching && filteredPosts.length === 0 && <p>Loading...</p>}
        {!isFetching && filteredPosts.length === 0 && <p>Empty</p>}
        {filteredPosts.length > 0 && (
          <ul>
            {filteredPosts.map((postId) => (
              <li key={postId}>
                <PostSnippet post={posts[postId]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  posts: state.entities.posts,
  fetchedPosts: state.fetchedPosts.posts,
  isFetching: state.fetchedPosts.isFetching,
  hasError: state.fetchedPosts.hasError,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (category) => dispatch(fetchPosts(category)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostList)
