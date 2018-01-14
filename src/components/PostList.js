import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { PostType } from '../utils/PropTypes'
import PostSnippet from './PostSnippet'
import Select from './Select'
import { fetchPosts, changePostSort } from '../actions'

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.objectOf(PostType),
    fetchedPosts: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    fetchPosts: PropTypes.func.isRequired,
    changePostSort: PropTypes.func.isRequired,
    postsSortOrder: PropTypes.string.isRequired,
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
    this.props.fetchPosts(this.props.match.params.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.fetchPosts(this.props.match.params.category)
    }
  }

  handleSort = (event) => {
    this.props.changePostSort(event.target.value)
  }

  render() {
    const {
      posts,
      fetchedPosts,
      isFetching,
      hasError,
      postsSortOrder,
    } = this.props
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
              selected={postsSortOrder}
              controlFunc={this.handleSort}
            />
            <ul>
              {filteredPosts
                .sort(
                  (a, b) => posts[b][postsSortOrder] - posts[a][postsSortOrder],
                )
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
  postsSortOrder: state.sortPosts,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (category) => dispatch(fetchPosts(category)),
  changePostSort: (sortOrder) => dispatch(changePostSort(sortOrder)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(PostList)
