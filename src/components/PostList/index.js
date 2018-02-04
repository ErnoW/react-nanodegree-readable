import React from 'react'
import PostSnippet from '../PostSnippet'
import styles from './PostList.module.css'

const PostList = (props) => {
  const posts = props.posts
  console.log('posts', posts)
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostSnippet post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostList
