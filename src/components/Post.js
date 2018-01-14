import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux'
import { PostType, CommentType } from '../utils/PropTypes'
import { relativeDate, largeDate } from '../utils/formatDate'
import {
  fetchPost,
  addPostVote,
  addCommentVote,
  changeCommentSort,
  createComment,
} from '../actions'
import Vote from './Vote'
import Select from './Select'
import Button from './Button'
import Input from './Input'
import TextArea from './TextArea'

class Post extends Component {
  state = {
    isCreateComment: false,
    isPosting: false,
    author: '',
    comment: '',
  }

  static defaultProps = {}

  static propTypes = {
    posts: PropTypes.objectOf(PostType).isRequired,
    displayComments: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.objectOf(CommentType).isRequired,
    isFetchingPost: PropTypes.bool.isRequired,
    hasErrorPost: PropTypes.bool.isRequired,
    isFetchingComments: PropTypes.bool.isRequired,
    hasErrorComments: PropTypes.bool.isRequired,
    fetchPost: PropTypes.func.isRequired,
    addPostVote: PropTypes.func.isRequired,
    addCommentVote: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    changeCommentSort: PropTypes.func.isRequired,
    commentsSortOrder: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  castPostVote = () => {
    const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
    this.props.addPostVote(this.props.match.params.id, vote)
  }

  castCommentVote = (id) => {
    const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
    this.props.addCommentVote(id, vote)
  }

  handleSort = (event) => {
    this.props.changeCommentSort(event.target.value)
  }

  handleInputChange = (event) => {
    const input = event.target.name
    const value = event.target.value

    this.setState({ [input]: value })
  }

  handleCommentReset = () => {
    this.setState({
      author: '',
      comment: '',
      isCreateComment: false,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    //TODO: check better validation?
    if (
      this.state.isPosting ||
      this.state.body === '' ||
      this.state.author === ''
    ) {
      return
    }

    this.setState({ isPosting: true })
    this.props
      .createComment({
        id: uuidv1(),
        timestamp: Date.now(),
        parentId: this.props.match.params.id,
        body: this.state.comment,
        author: this.state.author,
      })
      .then(() => this.setState({ isPosting: false, isCreateComment: false }))
  }

  showAddComment = () => {
    this.setState({
      isCreateComment: true,
    })
  }

  render() {
    const {
      posts,
      comments,
      displayComments,
      hasErrorPost,
      isFetchingPost,
      hasErrorComments,
      isFetchingComments,
      commentsSortOrder,
    } = this.props
    const { author, comment } = this.state
    const id = this.props.match.params.id

    let post = null
    if (posts[id]) {
      post = (
        <div>
          <h1>{posts[id].title}</h1>
          <p>
            By: {posts[id].author} at {largeDate(posts[id].timestamp)}
          </p>
          <p>Score: {posts[id].voteScore}</p>
          <p>{posts[id].body}</p>
        </div>
      )
    }

    //TODO: split commentList in seperate component
    let filteredComments = null
    if (displayComments.length > 0) {
      filteredComments = (
        <div>
          <Select
            label="Sort posts"
            name="post-sort"
            options={[
              { value: 'timestamp', label: 'Date' },
              { value: 'voteScore', label: 'Votes' },
            ]}
            selected={commentsSortOrder}
            controlFunc={this.handleSort}
          />
          <ul>
            {displayComments
              .sort(
                (a, b) =>
                  comments[b][commentsSortOrder] -
                  comments[a][commentsSortOrder],
              )
              .map((commentId) => {
                return (
                  <li key={commentId}>
                    <h4>{comments[commentId].author}</h4>
                    <p>{relativeDate(comments[commentId].timestamp)}</p>
                    <p>{comments[commentId].body}</p>
                    <p>votes: {comments[commentId].voteScore}</p>
                    <Vote
                      onClick={() =>
                        this.castCommentVote(comments[commentId].id)
                      }
                    />
                  </li>
                )
              })}
          </ul>
        </div>
      )
    } else {
      filteredComments = <p>No comments</p>
    }

    //TODO: make this more clean
    if (hasErrorPost) {
      return <p>Error on loading post</p>
    } else if (isFetchingPost) {
      return <p>Loading Post...</p>
    } else {
      return (
        <div>
          {post}
          <Vote onClick={this.castPostVote} />
          <div>
            {this.state.isCreateComment ? (
              <form onSubmit={this.handleSubmit}>
                <Input
                  name="author"
                  label="Author"
                  value={author}
                  controlFunc={this.handleInputChange}
                  placeholder="author"
                  disabled={this.state.isPosting}
                />
                <TextArea
                  name="comment"
                  label="Post"
                  value={comment}
                  controlFunc={this.handleInputChange}
                  placeholder="comment"
                  disabled={this.state.isPosting}
                />
                <Button
                  text="Create new comment"
                  type="submit"
                  disabled={this.state.isPosting}
                />
                <Button
                  text="Cancel"
                  type="reset"
                  onClick={this.handleCommentReset}
                  disabled={this.state.isPosting}
                />
              </form>
            ) : (
              <Button text="Add comment" onClick={this.showAddComment} />
            )}
          </div>
          <h3>Comments</h3>
          {hasErrorComments && <p>Error on loading comments</p>}
          {isFetchingComments && <p>Loading Comments...</p>}
          {!isFetchingComments && filteredComments}
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
  addPostVote: (id, vote) => dispatch(addPostVote(id, vote)),
  createComment: (comment) => dispatch(createComment(comment)),
  addCommentVote: (id, vote) => dispatch(addCommentVote(id, vote)),
  changeCommentSort: (sortOrder) => dispatch(changeCommentSort(sortOrder)),
})

const mapStateToProps = (state) => ({
  posts: state.entities.posts,
  comments: state.entities.comments,
  displayComments: state.displayComments.comments,
  isFetchingPost: state.displayPost.isFetching,
  hasErrorPost: state.displayPost.hasError,
  isFetchingComments: state.displayComments.isFetching,
  hasErrorComments: state.displayComments.hasError,
  commentsSortOrder: state.sortComments,
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
