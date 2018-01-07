import React, { Component } from 'react'
import { PostType, PostTypeDefault } from '../utils/PropTypes'

class PostSnippet extends Component {
  static defaultProps = {
    post: PostTypeDefault,
  }

  static propTypes = {
    post: PostType,
  }
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

export default PostSnippet
