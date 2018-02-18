import { schemas } from '../utils/api'
import type { PostType } from '../types/data'

// Load all posts of a category
export const POSTS_REQUEST = 'POSTS_REQUEST'
export const POSTS_SUCCESS = 'POSTS_SUCCESS'
export const POSTS_ERROR = 'POSTS_ERROR'

export const loadPosts = (category: string) => ({
  category,
  callAPI: {
    types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR],
    method: 'GET',
    schema: schemas.postList,
    endpoint: `${category}/posts`,
  },
})

// Load all posts
export const loadAllPosts = () => ({
  callAPI: {
    types: [POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR],
    method: 'GET',
    schema: schemas.postList,
    endpoint: 'posts',
  },
})

// Load an single post
export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_ERROR = 'POST_ERROR'

export const loadPost = (id: string) => ({
  id,
  callAPI: {
    types: [POST_REQUEST, POST_SUCCESS, POST_ERROR],
    method: 'GET',
    schema: schemas.post,
    endpoint: `posts/${id}`,
  },
})

// Create a post
export const POST_CREATE_REQUEST = 'POST_CREATE_REQUEST'
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS'
export const POST_CREATE_ERROR = 'POST_CREATE_ERROR'

export const createPost = (post: PostType) => ({
  post,
  callAPI: {
    types: [POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_ERROR],
    method: 'POST',
    body: post,
    schema: schemas.post,
    endpoint: 'posts',
  },
})

// Edit a post
export const POST_EDIT_REQUEST = 'POST_EDIT_REQUEST'
export const POST_EDIT_SUCCESS = 'POST_EDIT_SUCCESS'
export const POST_EDIT_ERROR = 'POST_EDIT_ERROR'

export const editPost = (id: String, post: PostType) => ({
  id,
  post,
  callAPI: {
    types: [POST_EDIT_REQUEST, POST_EDIT_SUCCESS, POST_EDIT_ERROR],
    method: 'PUT',
    body: post,
    schema: schemas.post,
    endpoint: `posts/${id}`,
  },
})

// Delete a post
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST'
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS'
export const POST_DELETE_ERROR = 'POST_DELETE_ERROR'

export const deletePost = (id: String) => ({
  id,
  callAPI: {
    types: [POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_ERROR],
    method: 'DELETE',
    endpoint: `posts/${id}`,
  },
})

// Vote a post
export const POST_VOTE_REQUEST = 'POST_VOTE_REQUEST'
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS'
export const POST_VOTE_ERROR = 'POST_VOTE_ERROR'

export const votePost = (id: string, vote: string) => ({
  id,
  vote,
  callAPI: {
    types: [POST_VOTE_REQUEST, POST_VOTE_SUCCESS, POST_VOTE_ERROR],
    method: 'POST',
    body: { option: vote },
    schema: schemas.post,
    endpoint: `posts/${id}`,
  },
})

// Change sort order of posts
export const POSTS_CHANGE_SORT = 'POSTS_CHANGE_SORT'

export const sortPosts = (sortOrder: string) => ({
  type: POSTS_CHANGE_SORT,
  sortOrder,
})
