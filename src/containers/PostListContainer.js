import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPosts, sortPosts, votePost } from '../actions'
import PostList from '../components/PostList'

class PostListContainer extends Component {
  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.loadPosts(this.props.match.params.category)
    }
  }

  render() {
    const {
      hasError,
      isFetching,
      allPosts,
      postIds,
      sortedBy,
      sortPosts,
      votePost,
    } = this.props
    const posts = postIds.map((postId) => allPosts[postId])

    return (
      <div className="container">
        {hasError && <p>Error</p>}
        {isFetching && posts.length === 0 && <p>Loading...</p>}
        {!isFetching && posts.length === 0 && <p>Empty</p>}
        {posts.length !== 0 && (
          <PostList
            posts={posts}
            sortPosts={sortPosts}
            sortedBy={sortedBy}
            votePost={votePost}
          />
        )}
      </div>
    )
  }
}

PostListContainer.defaultProps = {
  postIds: [],
}

const mapStatetoProps = (state, ownProps) => ({
  allPosts: state.entities.posts,
  postIds: state.fetchedPosts.posts[ownProps.match.params.category],
  isFetching: state.fetchedPosts.isFetching,
  hasError: state.fetchedPosts.hasError,
  sortedBy: state.postsSort,
})

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (category) => dispatch(loadPosts(category)),
  sortPosts: (sortOrder) => dispatch(sortPosts(sortOrder)),
  votePost: (id, voteType) => dispatch(votePost(id, voteType)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostListContainer)
