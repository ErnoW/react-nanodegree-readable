import React from 'react'
import styles from './PostMeta.module.css'
import { relativeDate } from '../../utils/format'
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import { ReactComponent as SvgAvatar } from '../../assets/svgs/avatar.svg'
import Vote2 from '../Vote2'

const PostMeta = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.author}>
        <SvgAvatar className={styles.avatar} />
        <span>{props.author}</span>
      </div>
      <div className={styles.meta}>
        <span>
          <SvgComments className="icn" />
          {props.comments}
        </span>
        <span>
          <Vote2 count={props.votes} onVote={props.onVote} />
        </span>
        <span>
          <SvgClock className="icn" />
          {relativeDate(props.timestamp)}
        </span>
      </div>
    </div>
  )
}

export default PostMeta
