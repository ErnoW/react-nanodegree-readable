import React from 'react';
import PostMeta from '../PostMeta'
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import Vote2 from '../Vote2'
import { relativeDate } from '../../utils/format'

const Post = (props) => {
  const {
    id,
    author,
    title,
    body,
    commentCount,
    voteScore,
    timestamp,
  } = this.props.post
  const { onVote } = this.props

  return (
    <div>
      <h1>{title}</h1>
      <PostMeta>
        <span>
          <SvgComments className="icn" />
          {commentCount}
        </span>
        <span>
          <Vote2 count={voteScore} onVote={() => onVote('upVote')} />
        </span>
        <span>
          <SvgClock className="icn" />
          {relativeDate(timestamp)}
        </span>
      </PostMeta>
    </div>
  );
};

export default Post;