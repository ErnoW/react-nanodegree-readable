import React, { Component } from 'react'
import PostSnippet from '../PostSnippet'
import styles from './PostList.module.css'
import Select from '../UI/Select'

class PostList extends Component {
  render() {
    const { posts, sortPosts, sortedBy, votePost } = this.props
    console.log(votePost)

    return (
      <div>
        <Select
          label="Sort posts:"
          name="post-sort"
          options={[
            { value: 'timestamp', label: 'Date' },
            { value: 'voteScore', label: 'Votes' },
          ]}
          selected={sortedBy}
          onChange={sortPosts}
          inline="true"
        />
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <PostSnippet post={post} onVote={(voteType) => votePost(post.id, voteType)} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PostList
