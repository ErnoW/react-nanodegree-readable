import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { PostType, CommentType } from '../utils/PropTypes'
import { relativeDate, largeDate } from '../utils/format'
import {
  loadPost,
  loadComments,
  votePost,
  voteComment,
  sortComments,
  createComment,
} from '../actions'
import Vote from '../components/Vote'
import Select from '../components/UI/Select'
import NewComment from './NewComment'
import Post from '../components/Post'

class PostContainer extends Component {
  // static propTypes = {
  //   posts: PropTypes.objectOf(PostType).isRequired,
  //   displayComments: PropTypes.arrayOf(PropTypes.string).isRequired,
  //   comments: PropTypes.objectOf(CommentType).isRequired,
  //   isFetchingPost: PropTypes.bool.isRequired,
  //   hasErrorPost: PropTypes.bool.isRequired,
  //   isFetchingComments: PropTypes.bool.isRequired,
  //   hasErrorComments: PropTypes.bool.isRequired,
  //   loadPost: PropTypes.func.isRequired,
  //   loadComments: PropTypes.func.isRequired,
  //   votePost: PropTypes.func.isRequired,
  //   voteComment: PropTypes.func.isRequired,
  //   createComment: PropTypes.func.isRequired,
  //   sortComments: PropTypes.func.isRequired,
  //   commentsSort: PropTypes.string.isRequired,
  //   match: PropTypes.shape({
  //     params: PropTypes.shape({
  //       id: PropTypes.string,
  //     }),
  //   }).isRequired,
  // }

  componentDidMount() {
    this.props.loadPost(this.props.match.params.id).then((response) => {
      if (response.error) {
        return
      }
      // return this.props.loadComments(this.props.match.params.id)
    })
  }

  // castPostVote = () => {
  //   const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
  //   this.props.votePost(this.props.match.params.id, vote)
  // }

  // castCommentVote = (id) => {
  //   const vote = 'upVote' //TODO: swithc between upvote and downvote (and remember state)
  //   this.props.voteComment(id, vote)
  // }

  // handleSort = (event) => {
  //   this.props.sortComments(event.target.value)
  // }

  // handleInputChange = (event) => {
  //   const input = event.target.name
  //   const value = event.target.value

  //   this.setState({ [input]: value })
  // }

  render() {
    return (
      <Post />
    )
  }

  // render() {
  //   const {
  //     posts,
  //     comments,
  //     displayComments,
  //     hasErrorPost,
  //     isFetchingPost,
  //     hasErrorComments,
  //     isFetchingComments,
  //     commentsSort,
  //   } = this.props
  //   // const { author, comment } = this.state
  //   const id = this.props.match.params.id

  //   let post = null
  //   if (posts[id]) {
  //     post = (
  //       <div>
  //         <h1>{posts[id].title}</h1>
  //         <p>
  //           By: {posts[id].author} at {largeDate(posts[id].timestamp)}
  //         </p>
  //         <p>Score: {posts[id].voteScore}</p>
  //         <p>{posts[id].body}</p>
  //       </div>
  //     )
  //   }

  //   //TODO: split commentList in seperate component
  //   let filteredComments = null
  //   if (displayComments.length > 0) {
  //     filteredComments = (
  //       <div>
  //         <Select
  //           label="Sort posts:"
  //           name="post-sort"
  //           options={[
  //             { value: 'timestamp', label: 'Date' },
  //             { value: 'voteScore', label: 'Votes' },
  //           ]}
  //           selected={commentsSort}
  //           onChange={this.handleSort}
  //           inline="true"
  //         />
  //         <ul>
  //           {displayComments
  //             .sort(
  //               (a, b) => comments[b][commentsSort] - comments[a][commentsSort],
  //             )
  //             .map((commentId) => {
  //               return (
  //                 <li key={commentId}>
  //                   <h4>{comments[commentId].author}</h4>
  //                   <p>{relativeDate(comments[commentId].timestamp)}</p>
  //                   <p>{comments[commentId].body}</p>
  //                   <p>votes: {comments[commentId].voteScore}</p>
  //                   <Vote
  //                     onClick={() =>
  //                       this.castCommentVote(comments[commentId].id)
  //                     }
  //                   />
  //                 </li>
  //               )
  //             })}
  //         </ul>
  //       </div>
  //     )
  //   } else {
  //     filteredComments = <p>No comments</p>
  //   }

  //   //TODO: make this more clean
  //   if (hasErrorPost) {
  //     return <p>Error on loading post</p>
  //   } else if (isFetchingPost) {
  //     return <p>Loading Post...</p>
  //   } else {
  //     return (
  //       <div className="container">
  //         {post}
  //         <Vote onClick={this.castPostVote} />
  //         <h2>Add new comment</h2>
  //         <NewComment parentId={id} />

  //         <h3>Comments</h3>
  //         {hasErrorComments && <p>Error on loading comments</p>}
  //         {isFetchingComments && <p>Loading Comments...</p>}
  //         {!isFetchingComments && filteredComments}
  //       </div>
  //     )
  //   }
  // }
}

const mapDispatchToProps = (dispatch) => ({
  loadPost: (id) => dispatch(loadPost(id)),
  loadComments: (id) => dispatch(loadComments(id)),
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  createComment: (comment) => dispatch(createComment(comment)),
  voteComment: (id, vote) => dispatch(voteComment(id, vote)),
  sortComments: (sortOrder) => dispatch(sortComments(sortOrder)),
})

const mapStateToProps = (state) => ({
  posts: state.entities.posts,
  comments: state.entities.comments,
  displayComments: state.displayComments.comments,
  isFetchingPost: state.displayPost.isFetching,
  hasErrorPost: state.displayPost.hasError,
  isFetchingComments: state.displayComments.isFetching,
  hasErrorComments: state.displayComments.hasError,
  commentsSort: state.commentsSort,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
