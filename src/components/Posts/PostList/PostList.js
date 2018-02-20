import React from 'react'
import PostSnippet from 'components/Posts/PostSnippet'
import styles from './PostList.module.css'
import Select from 'components/UI/Select'
import type { PostType } from 'types/data'

type Props = {
  posts: Array<PostType>,
  sortPosts: () => mixed,
  sortedBy: string,
  votePost: (id: string, voteType: string) => mixed,
  deletePost: (id: string) => mixed,
}

const PostList = (props: Props) => {
  const { posts, sortPosts, sortedBy, votePost, deletePost } = props
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
        inline={true}
      />
      <ul className={styles.list}>
        {posts.sort((a, b) => b[sortedBy] - a[sortedBy]).map((post) => (
          <li key={post.id}>
            <PostSnippet
              post={post}
              votePost={(voteType) => votePost(post.id, voteType)}
              deletePost={() => deletePost(post.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
