import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PostType } from '../utils/PropTypes'

class PostSnippet extends Component {
  static propTypes = {
    post: PostType.isRequired,
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
      <div>
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{body}</p>
        Author: {author} | Comments: {commentCount} | Votes: {voteScore} | Date:{' '}
        {timestamp}
      </div>
    )
  }
}

export default PostSnippet
