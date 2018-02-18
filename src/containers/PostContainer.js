import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadPost, editPost, deletePost, votePost } from '../actions'
import Post from '../components/Post'
import type { PostType } from '../types/data'

type Props = {
  match: { params: { id: string } },
  loadPost: (id: string) => mixed,
  hasError: boolean,
  isFetching: boolean,
  post: PostType,
  votePost: () => mixed,
  editPost: () => mixed,
  deletePost: () => Promise<any>,
}

class PostContainer extends Component<Props> {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.id)
  }

  handleDelete = (id) =>
    this.props
      .deletePost(id)
      .then(() => this.props.push(`/category/${this.props.post.category}`))

  render() {
    const {
      hasError,
      isFetching,
      post,
      votePost,
      editPost,
      deletePost,
    } = this.props

    return (
      <div className="container">
        {hasError && <p>Error</p>}
        {isFetching && typeof post === 'undefined' && <p>Loading...</p>}
        {typeof post !== 'undefined' && (
          <Post
            post={post}
            votePost={votePost}
            editPost={editPost}
            deletePost={this.handleDelete}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPost: (id) => dispatch(loadPost(id)),
  editPost: (id, post) => dispatch(editPost(id, post)),
  deletePost: (id) => dispatch(deletePost(id)),
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  push: (path) => dispatch(push(path)),
})

const mapStateToProps = (state, ownProps) => ({
  post: state.entities.posts[ownProps.match.params.id],
  isFetching: state.displayPost.isFetching,
  hasError: state.displayPost.hasError,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
