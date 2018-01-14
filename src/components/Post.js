import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType, CommentType } from '../utils/PropTypes'
import { fetchPost, addVote } from '../actions'
import Vote from './Vote'
import { relativeDate, largeDate } from '../utils/formatDate'

class Post extends Component {
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
    addVote: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  castVote = () => {
    const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
    this.props.addVote(this.props.match.params.id, vote)
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
    } = this.props
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
        <ul>
          {displayComments.map((commentId) => {
            return (
              <li key={commentId}>
                <h4>{comments[commentId].author}</h4>
                <p>{relativeDate(comments[commentId].timestamp)}</p>
                <p>{comments[commentId].body}</p>
              </li>
            )
          })}
        </ul>
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
          <Vote onClick={this.castVote} />
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
  addVote: (id, vote) => dispatch(addVote(id, vote)),
})

const mapStateToProps = (state) => ({
  posts: state.entities.posts,
  comments: state.entities.comments,
  displayComments: state.displayComments.comments,
  isFetchingPost: state.displayPost.isFetching,
  hasErrorPost: state.displayPost.hasError,
  isFetchingComments: state.displayComments.isFetching,
  hasErrorComments: state.displayComments.hasError,
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
