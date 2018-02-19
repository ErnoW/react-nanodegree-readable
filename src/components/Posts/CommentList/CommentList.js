import React from 'react'
import styles from './CommentList.module.css'
import Select from '../../UI/Select'
import type { CommentType } from '../../../types/data'
import Comment from '../Comment'

type Props = {
  comments: Array<CommentType>,
  sortComments: () => mixed,
  sortedBy: string,
  voteComment: (id: string, voteType: string) => Promise<any>,
  deleteComment: (id: string) => Promise<any>,
  editComment: (
    id: string,
    comment: { body: string, timeStamp: number },
  ) => Promise<any>,
}

const CommentList = (props: Props) => {
  const {
    comments,
    sortComments,
    sortedBy,
    voteComment,
    editComment,
    deleteComment,
  } = props

  return (
    <div>
      <h2>Comments</h2>
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
            <Comment
              comment={comment}
              voteComment={voteComment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
