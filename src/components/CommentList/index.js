import React, { Component } from 'react'
import styles from './CommentList.module.css'
import Select from '../UI/Select'
import { relativeDate } from '../../utils/format'
import Vote2 from '../Vote2'

class CommentList extends Component {
  render() {
    const { comments, sortComments, sortedBy, voteComment } = this.props

    return (
      <div>
        <Select
          label="Sort comments:"
          name="comment-sort"
          options={[
            { value: 'timestamp', label: 'Date' },
            { value: 'voteScore', label: 'Votes' },
          ]}
          selected={sortedBy}
          onChange={sortComments}
          inline="true"
        />
        <ul className={styles.list}>
          {comments.sort((a, b) => b[sortedBy] - a[sortedBy]).map((comment) => (
            <li key={comment.id}>
              <h4>{comment.author}</h4>
              <p>{relativeDate(comment.timestamp)}</p>
              <p>{comment.body}</p>
              <p>votes: {comment.voteScore}</p>
              <Vote2 onVote={() => voteComment(comment.id, 'upVote')} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CommentList
