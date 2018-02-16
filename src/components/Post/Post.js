import React, { Component } from 'react'
import PostMeta from '../PostMeta'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgClock } from '../../assets/svgs/clock.svg'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgComments } from '../../assets/svgs/comments.svg'
import Vote from '../Vote'
import { relativeDate } from '../../utils/format'
import type { PostType } from '../../types/data'
import Button from '../UI/Button'
import PostForm from '../../forms/PostForm'
type Props = {
  post: PostType,
  votePost: (id: string, voteType: string) => mixed,
}

class Post extends Component<Props> {
  state = { editMode: false }

  handleSubmit = () => {
    return new Promise((resolve, reject) => {
      this.setState({ editMode: false })
    })
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
    const { votePost } = this.props

    //test
    const category = 'react'

    //test
    const categories = [{ value: 'react' }]

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
          <Button
            onClick={() => this.setState({ editMode: true })}
            text="Edit"
          />
        </PostMeta>
        {this.state.editMode ? (
          <PostForm
            author={author}
            body={body}
            category={category}
            title={title}
            handleSubmit={this.handleSubmit}
            categories={categories}
          />
        ) : (
          <p>{body}</p>
        )}
      </div>
    )
  }
}

export default Post
