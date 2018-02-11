import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPost, votePost } from '../actions'
import Post from '../components/Post'

class PostContainer extends Component {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.id)
  }

  render() {
    const { hasError, isFetching, post, votePost } = this.props

    return (
      <div className="container">
        {hasError && <p>Error</p>}
        {isFetching && typeof post === 'undefined' && <p>Loading...</p>}
        {typeof post !== 'undefined' && (
          <Post post={post} votePost={votePost} />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPost: (id) => dispatch(loadPost(id)),
  votePost: (id, vote) => dispatch(votePost(id, vote)),
})

const mapStateToProps = (state, ownProps) => ({
  post: state.entities.posts[ownProps.match.params.id],
  isFetching: state.displayPost.isFetching,
  hasError: state.displayPost.hasError,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)