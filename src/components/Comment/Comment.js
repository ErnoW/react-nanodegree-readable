import React, { Component, Fragment } from 'react'
import { relativeDate } from '../../utils/format'
import Vote from '../Vote'
import Button from '../UI/Button'
import CommentEditForm from '../../forms/CommentEditForm'
import type { CommentType } from '../../types/data'

type Props = {
  comment: CommentType,
  voteComment: (id: string, voteType: string) => Promise<any>,
  deleteComment: (id: string) => Promise<any>,
  editComment: (
    id: string,
    comment: { body: string, timeStamp: number },
  ) => Promise<any>,
}

type State = {
  editMode: boolean,
}

class Comment extends Component<Props, State> {
  state = {
    editMode: false,
  }

  handleSubmit = (values: { comment: string }) => {
    return this.props
      .editComment(this.props.comment.id, {
        body: values.comment,
        timeStamp: Date.now(),
      })
      .then(() => {
        this.setState({ editMode: false })
      })
  }

  render() {
    const { author, timestamp, body, id, voteScore } = this.props.comment
    const { voteComment, deleteComment } = this.props

    return (
      <div>
        <h4>{author}</h4>
        <p>{relativeDate(timestamp)}</p>
        {this.state.editMode ? (
          <CommentEditForm comment={body} handleSubmit={this.handleSubmit} />
        ) : (
          <Fragment>
            <p>{body}</p>
            <Button
              text="Edit"
              onClick={() => this.setState({ editMode: true })}
            />
            <Button text="Delete" onClick={() => deleteComment(id)} />
          </Fragment>
        )}
        <Vote
          onVote={(voteType) => voteComment(id, voteType)}
          count={voteScore}
        />
      </div>
    )
  }
}

export default Comment
