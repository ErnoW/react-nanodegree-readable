// TODO: Move to container or so?? Or make functional

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PostType } from '../../utils/PropTypes'
import { votePost } from '../../actions'
import Vote from '../Vote'
import { relativeDate } from '../../utils/format'
import styles from './PostSnippet.module.css'

class PostSnippet extends Component {
  static propTypes = {
    post: PostType.isRequired,
    votePost: PropTypes.func.isRequired,
  }

  castVote = () => {
    const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
    this.props.votePost(this.props.post.id, vote)
  }

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

    return (
      <div className={styles.container}>
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{body}</p>
        Author: {author} | Comments: {commentCount} | Votes: {voteScore} | Date:{' '}
        {relativeDate(timestamp)}
        <Vote onClick={this.castVote} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  votePost: (id, vote) => dispatch(votePost(id, vote)),
})

export default connect(null, mapDispatchToProps)(PostSnippet)
