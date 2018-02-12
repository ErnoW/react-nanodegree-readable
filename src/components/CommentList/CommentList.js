import React from 'react'
import styles from './CommentList.module.css'
import Select from '../UI/Select'
import { relativeDate } from '../../utils/format'
import Vote from '../Vote'
import type { CommentType } from '../../types/data'

type Props = {
  comments: Array<CommentType>,
  sortComments: () => mixed,
  sortedBy: string,
  voteComment: (id: string, voteType: string) => mixed,
}

const CommentList = (props: Props) => {
  const { comments, sortComments, sortedBy, voteComment } = props
  console.log(comments)
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
        inline={true}
      />
      <ul className={styles.list}>
        {comments.sort((a, b) => b[sortedBy] - a[sortedBy]).map((comment) => (
          <li key={comment.id}>
            <h4>{comment.author}</h4>
            <p>{relativeDate(comment.timestamp)}</p>
            <p>{comment.body}</p>
            <Vote
              onVote={() => voteComment(comment.id, 'upVote')}
              count={comment.voteScore}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
