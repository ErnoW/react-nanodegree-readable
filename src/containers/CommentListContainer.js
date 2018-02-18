import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadComments,
  voteComment,
  editComment,
  deleteComment,
  sortComments,
} from '../actions'
import CommentList from '../components/CommentList'
import type { CommentType } from '../types/data'

type Props = {
  loadComments: (id: string) => mixed,
  voteComment: () => mixed,
  sortComments: () => mixed,
  match: { params: { id: string } },
  hasError: boolean,
  isFetching: boolean,
  allComments: { [string]: CommentType },
  commentIds: Array<string>,
  sortedBy: string,
}

class CommentListContainer extends Component<Props> {
  static defaultProps = {
    commentsIds: [],
  }

  componentDidMount() {
    this.props.loadComments(this.props.match.params.id)
  }

  render() {
    const {
      hasError,
      isFetching,
      allComments,
      commentIds,
      sortedBy,
      sortComments,
      voteComment,
      editComment,
      deleteComment,
    } = this.props
    const comments = commentIds.map((id) => allComments[id])

    return (
      <div className="container">
        {hasError && <p>Error</p>}
        {isFetching && <p>Loading...</p>}
        {!isFetching && comments.length === 0 && <p>Empty</p>}
        {!isFetching &&
          comments.length !== 0 && (
            <CommentList
              comments={comments}
              sortComments={sortComments}
              sortedBy={sortedBy}
              voteComment={voteComment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(loadComments(id)),
  voteComment: (id, vote) => dispatch(voteComment(id, vote)),
  editComment: (id, comment) => dispatch(editComment(id, comment)),
  deleteComment: (id) => dispatch(deleteComment(id)),
  sortComments: (sortOrder) => dispatch(sortComments(sortOrder)),
})

const mapStateToProps = (state, ownProps) => ({
  commentIds: state.displayComments.comments,
  allComments: state.entities.comments,
  isFetching: state.displayComments.isFetching,
  hasError: state.displayComments.hasError,
  sortedBy: state.commentsSort,
})

export default connect(mapStateToProps, mapDispatchToProps)(
  CommentListContainer,
)
