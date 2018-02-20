import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'
import { loadPost, editPost, deletePost, votePost } from 'actions'
import Post from 'components/Posts/Post'
import type { PostType } from 'types/data'
import CommentList from 'containers/CommentListContainer'
import NewComment from 'containers/NewComment'
import Loader from 'components/UI/Loader'

type Props = {
  match: { params: { id: string } },
  hasError: boolean,
  isFetching: boolean,
  post: PostType,
  loadPost: (id: string) => Promise<any>,
  votePost: (id: string, voteType: string) => Promise<any>,
  editPost: (id: string, post: { title: string, body: string }) => Promise<any>,
  deletePost: (id: string) => Promise<any>,
  push: (path: string) => mixed,
}

class PostContainer extends Component<Props> {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.id)
  }

  handleDelete = (id: string) =>
    this.props
      .deletePost(id)
      .then(() => this.props.push(`/category/${this.props.post.category}`))

  render() {
    const { hasError, isFetching, post, votePost, editPost } = this.props

    return (
      <div className="container">
        {hasError || post.deleted === true ? <Redirect to="/404" /> : ''}
        {isFetching && typeof post === 'undefined' && <Loader />}
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
