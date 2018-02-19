import React, { Component, Fragment } from 'react'
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
import styles from './Post.module.css'

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
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <span className={styles.author}>By {author}</span>
          <PostMeta className={styles.meta}>
            <span>
              <SvgComments className="icn" />
              {commentCount}
            </span>
            <Vote
              count={voteScore}
              onVote={(voteType) => votePost(id, voteType)}
            />
            <span>
              <SvgClock className="icn" />
              {relativeDate(timestamp)}
            </span>
          </PostMeta>
        </header>

        {this.state.editMode ? (
          <PostEditForm
            body={body}
            title={title}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <Fragment>
            <p className={styles.body}>{body}</p>
            <div className={styles.buttons}>
              <Button
                onClick={() => this.setState({ editMode: true })}
                text="Edit"
                linkButton={true}
              />
              <Button
                onClick={() => deletePost(id)}
                text="Delete"
                linkButton={true}
              />
            </div>
          </Fragment>
        )}
        <div className={styles.seperator} />
      </div>
    )
  }
}

export default Post
