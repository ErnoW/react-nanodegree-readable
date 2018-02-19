import React, { Component } from 'react'
import PostMeta from 'components/Posts/PostMeta'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgClock } from 'assets/svgs/clock.svg'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgComments } from 'assets/svgs/comments.svg'
import Vote from '../Vote'
import { relativeDate } from 'utils/format'
import type { PostType } from 'types/data'
import Button from 'components/UI/Button'
import PostEditForm from 'forms/PostEditForm'

type Props = {
  post: PostType,
  votePost: (id: string, voteType: string) => Promise<any>,
  deletePost: (id: string) => Promise<any>,
  editPost: (id: string, post: { title: string, body: string }) => Promise<any>,
}

type State = {
  editMode: boolean,
}

class Post extends Component<Props, State> {
  state = { editMode: false }

  handleSubmit = (values: { title: string, body: string }) => {
    return this.props
      .editPost(this.props.post.id, {
        title: values.title,
        body: values.body,
      })
      .then(() => {
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
    const { votePost, deletePost } = this.props

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
            <Vote
              count={voteScore}
              onVote={(voteType) => votePost(id, voteType)}
            />
          </span>
          <span>
            <SvgClock className="icn" />
            {relativeDate(timestamp)}
          </span>
          <Button
            onClick={() => this.setState({ editMode: true })}
            text="Edit"
          />
          <Button onClick={() => deletePost(id)} text="Delete" />
        </PostMeta>
        {this.state.editMode ? (
          <PostEditForm
            body={body}
            title={title}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <p>{body}</p>
        )}
      </div>
    )
  }
}

export default Post
