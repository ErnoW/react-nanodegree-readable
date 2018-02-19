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
import type { PostType } from 'types/data'

type Props = {
  post: PostType,
  votePost: (voteType: string) => mixed,
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
  const { votePost } = props

  return (
    <div className={styles.container}>
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
      </PostMeta>
    </div>
  )
}

export default PostSnippet
