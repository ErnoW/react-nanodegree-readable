import React from 'react'
import PostMeta from '../PostMeta'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import Vote from '../Vote'
import { relativeDate } from '../../utils/format'
import type { PostType } from '../../types/data'

type Props = {
  post: PostType,
  votePost: (id: string, voteType: string) => mixed,
}

const Post = (props: Props) => {
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
          <Vote count={voteScore} onVote={() => votePost(id, 'upVote')} />
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
