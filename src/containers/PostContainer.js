import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadPost, editPost, deletePost, votePost } from '../actions'
import Post from '../components/Post'
import type { PostType } from '../types/data'
import CommentList from './CommentListContainer'
import NewComment from './NewComment'

type Props = {
  match: { params: { id: string } },
  loadPost: (id: string) => Promise<any>,
  hasError: boolean,
  isFetching: boolean,
  post: PostType,
  votePost: () => Promise<any>,
  editPost: () => Promise<any>,
  deletePost: () => Promise<any>,
}

class PostContainer extends Component<Props> {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.id).then((response) => {
      // Handle deleted posts
      if (response.payload.result === undefined) {
        console.log('nope')
      }
    })
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
        {hasError && <p>Post not found</p>}
        {isFetching && typeof post === 'undefined' && <p>Loading...</p>}
        {!hasError &&
          typeof post !== 'undefined' && (
            <Fragment>
              <Post
                post={post}
                votePost={votePost}
                editPost={editPost}
                deletePost={this.handleDelete}
              />
              <NewComment
                match={{ params: { id: this.props.match.params.id } }}
              />
              <CommentList
                match={{ params: { id: this.props.match.params.id } }}
              />
            </Fragment>
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
