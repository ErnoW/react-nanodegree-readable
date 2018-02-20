import React from 'react'
import { Link } from 'react-router-dom'
import { relativeDate } from 'utils/format'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgClock } from 'assets/svgs/clock.svg'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgComments } from 'assets/svgs/comments.svg'
import Vote from 'components/Posts/Vote'
import styles from './PostSnippet.module.css'
import PostMeta from 'components/Posts/PostMeta'
import Button from 'components/UI/Button'
import type { PostType } from 'types/data'

type Props = {
  post: PostType,
  votePost: (voteType: string) => mixed,
  deletePost: () => mixed,
}

const PostSnippet = (props: Props) => {
  const {
    id,
    author,
    title,
    body,
    commentCount,
    voteScore,
    timestamp,
  } = props.post
  const { votePost, deletePost } = props

  return (
    <div>
      <Link to={`/post/${id}`}>
        <h2 className={styles.heading}>{title}</h2>
      </Link>
      <span className={styles.author}>By {author}</span>
      <p>{body}</p>
      <PostMeta>
        <span>
          <SvgComments className="icn" />
          {commentCount}
        </span>
        <Vote count={voteScore} onVote={(voteType) => votePost(voteType)} />
        <span>
          <SvgClock className="icn" />
          {relativeDate(timestamp)}
        </span>
        <div className={styles.buttons}>
          <Button onClick={deletePost} text="Delete" linkButton={true} />
        </div>
      </PostMeta>
    </div>
  )
}

export default PostSnippet
