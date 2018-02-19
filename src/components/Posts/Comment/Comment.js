import React, { Component, Fragment } from 'react'
import { relativeDate } from 'utils/format'
import Vote from 'components/Posts/Vote'
import Button from 'components/UI/Button'
import CommentEditForm from 'forms/CommentEditForm'
import type { CommentType } from 'types/data'
import styles from './Comment.module.css'

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
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.writer}>{author}</span>
          <span>{relativeDate(timestamp)}</span>
        </header>
        <main>
          {this.state.editMode ? (
            <CommentEditForm comment={body} handleSubmit={this.handleSubmit} />
          ) : (
            <Fragment>
              <div className={styles.content}>
                <Vote
                  onVote={(voteType) => voteComment(id, voteType)}
                  count={voteScore}
                />
                <p>{body}</p>
              </div>

              <div className={styles.buttons}>
                <Button
                  text="Edit"
                  onClick={() => this.setState({ editMode: true })}
                  linkButton={true}
                />
                <Button
                  text="Delete"
                  onClick={() => deleteComment(id)}
                  linkButton={true}
                />
              </div>
            </Fragment>
          )}
        </main>
      </div>
    )
  }
}

export default Comment
