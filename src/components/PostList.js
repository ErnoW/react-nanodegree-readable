import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import PostSnippet from './PostSnippet'
import Select from './Select'
import { loadPosts, sortPosts } from '../actions'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    fetchedPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    loadPosts: PropTypes.func.isRequired,
    sortPosts: PropTypes.func.isRequired,
    postsSort: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  static defaultProps = {
    fetchedPosts: [],
    posts: [],
  }

  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.loadPosts(this.props.match.params.category)
    }
  }

  handleSort = (event) => {
    this.props.sortPosts(event.target.value)
  }

  render() {
    const { posts, fetchedPosts, isFetching, hasError, postsSort } = this.props
    const category = this.props.match.params.category

    let filteredPosts = []
    if (fetchedPosts[category]) {
      filteredPosts = fetchedPosts[category]
    }

    //TODO: better error and loading handling
    return (
      <div>
        {hasError && <p>Error</p>}
        {isFetching && filteredPosts.length === 0 && <p>Loading...</p>}
        {!isFetching && !hasError && filteredPosts.length === 0 && <p>Empty</p>}
        {filteredPosts.length > 0 && (
          <div>
            <Select
              label="Sort posts"
              name="post-sort"
              options={[
                { value: 'timestamp', label: 'Date' },
                { value: 'voteScore', label: 'Votes' },
              ]}
              selected={postsSort}
              controlFunc={this.handleSort}
            />
            <ul>
              {filteredPosts
                .sort((a, b) => posts[b][postsSort] - posts[a][postsSort])
                .map((postId) => (
                  <li key={postId}>
                    <PostSnippet post={posts[postId]} />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  posts: state.entities.posts,
  fetchedPosts: state.fetchedPosts.posts,
  isFetching: state.fetchedPosts.isFetching,
  hasError: state.fetchedPosts.hasError,
  postsSort: state.postsSort,
})

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (category) => dispatch(loadPosts(category)),
  sortPosts: (sortOrder) => dispatch(sortPosts(sortOrder)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostList)
