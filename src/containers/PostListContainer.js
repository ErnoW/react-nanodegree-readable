import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllPosts, loadPosts, sortPosts, votePost } from '../actions'
import PostList from '../components/Posts/PostList'
import Loader from 'components/UI/Loader'
import Notification from 'components/UI/Notification'
import type { PostType } from '../types/data'

type Props = {
  match: { params: { category: string } },
  hasError: boolean,
  isFetching: boolean,
  allPosts: { [string]: PostType },
  postIds: Array<string>,
  sortedBy: string,
  loadPosts: (category: string) => Promise<any>,
  sortPosts: () => Promise<any>,
  votePost: () => Promise<any>,
  loadAllPosts: () => Promise<any>,
}

class PostListContainer extends Component<Props> {
  static defaultProps = {
    postIds: [],
  }

  componentDidMount() {
    if (!this.props.match.params.category) {
      this.props.loadAllPosts()
    } else {
      this.props.loadPosts(this.props.match.params.category)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      if (!this.props.match.params.category) {
        this.props.loadAllPosts()
      } else {
        this.props.loadPosts(this.props.match.params.category)
      }
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
        <h1>{this.props.match.params.category || 'Home'}</h1>
        {hasError && <Notification type="error" text="Error" />}
        {isFetching && posts.length === 0 && <Loader />}
        {!isFetching && posts.length === 0 && <Notification text="No posts" />}
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

const mapStatetoProps = (state, ownProps) => ({
  allPosts: state.entities.posts,
  postIds: state.fetchedPosts.posts[ownProps.match.params.category],
  isFetching: state.fetchedPosts.isFetching,
  hasError: state.fetchedPosts.hasError,
  sortedBy: state.postsSort,
})

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (category) => dispatch(loadPosts(category)),
  loadAllPosts: () => dispatch(loadAllPosts()),
  sortPosts: (sortOrder) => dispatch(sortPosts(sortOrder)),
  votePost: (id, voteType) => dispatch(votePost(id, voteType)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostListContainer)
