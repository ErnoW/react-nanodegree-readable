import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import { loadPosts, sortPosts, votePost } from '../actions'
import PostList from '../components/PostList'

class PostListContainer extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    fetchedPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    loadPosts: PropTypes.func.isRequired,
    sortPosts: PropTypes.func.isRequired,
    postsSort: PropTypes.string.isRequired,
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
    this.props.loadPosts(this.props.match.params.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.loadPosts(this.props.match.params.category)
    }
  }

  render() {
    const { posts, fetchedPosts, isFetching, hasError, postsSort } = this.props
    const category = this.props.match.params.category

    let filteredPosts = []
    if (fetchedPosts[category]) {
      filteredPosts = fetchedPosts[category]
    }

    return (
      <div className="container">
        {hasError && <p>Error</p>}
        {isFetching && filteredPosts.length === 0 && <p>Loading...</p>}
        {!isFetching && !hasError && filteredPosts.length === 0 && <p>Empty</p>}
        {filteredPosts.length > 0 && (
          <PostList
            posts={filteredPosts
              .sort((a, b) => posts[b][postsSort] - posts[a][postsSort])
              .map((postId) => posts[postId])}
            sortPosts={this.props.sortPosts}
            sortedBy={this.props.postsSort}
            votePost={this.props.votePost}
          />
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
  postsSort: state.postsSort,
})

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (category) => dispatch(loadPosts(category)),
  sortPosts: (sortOrder) => dispatch(sortPosts(sortOrder)),
  votePost: (id, voteType) => dispatch(votePost(id, voteType)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostListContainer)
