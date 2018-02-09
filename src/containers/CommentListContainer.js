import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadComments, voteComment, sortComments } from '../actions'
import CommentList from '../components/CommentList'

class CommentListContainer extends Component {
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
            />
          )}
      </div>
    )
  }
}

CommentListContainer.defaultProps = {
  commentsIds: [],
}

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(loadComments(id)),
  voteComment: (id, vote) => dispatch(voteComment(id, vote)),
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
