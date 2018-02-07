// TODO: Move to container or so?? Or make functional

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PostType } from '../../utils/PropTypes'
import { votePost } from '../../actions'
import { relativeDate } from '../../utils/format'
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import Vote2 from '../Vote2'
import styles from './PostSnippet.module.css'
import PostMeta from '../PostMeta'

class PostSnippet extends Component {
  render() {
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
          <span>
            <Vote2 count={voteScore} onVote={() => onVote('upVote')} />
          </span>
          <span>
            <SvgClock className="icn" />
            {relativeDate(timestamp)}
          </span>
        </PostMeta>
      </div>
    )
  }
}

export default PostSnippet
