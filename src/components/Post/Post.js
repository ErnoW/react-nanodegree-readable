import React from 'react'
import PostMeta from '../PostMeta'
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import Vote2 from '../Vote2'
import { relativeDate } from '../../utils/format'

const Post = (props) => {
  console.log(props)
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
    <div>
      <h1>{title}</h1>
      <span>By {author}</span>
      <PostMeta>
        <span>
          <SvgComments className="icn" />
          {commentCount}
        </span>
        <span>
          <Vote2 count={voteScore} onVote={() => votePost(id, 'upVote')} />
        </span>
        <span>
          <SvgClock className="icn" />
          {relativeDate(timestamp)}
        </span>
      </PostMeta>
      <p>{body}</p>
    </div>
  )
}

export default Post
