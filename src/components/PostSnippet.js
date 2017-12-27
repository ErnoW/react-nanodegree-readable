import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostSnippet extends Component {
  // eslint-disable-line
  render() {
    const {
      author,
      title,
      body,
      commentCount,
      voteScore,
      timestamp,
    } = this.props.post
    return (
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        Author: {author} | Comments: {commentCount} | Votes: {voteScore} | Date:{' '}
        {timestamp}
      </div>
    )
  }
}

PostSnippet.defaultProps = {
  post: {
    author: 'unknow',
    commentCount: 0,
    voteScore: 0,
  },
}

PostSnippet.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number.isRequired,
  }),
}

export default PostSnippet
