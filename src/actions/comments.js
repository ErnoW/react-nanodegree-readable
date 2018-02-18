import { schemas } from '../utils/api'
import type { CommentType } from '../types/data'

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST'
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS'
export const COMMENTS_ERROR = 'COMMENTS_ERROR'

// Load all comments of an post
export const loadComments = (id: string) => ({
  id,
  callAPI: {
    types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_ERROR],
    method: 'GET',
    schema: schemas.commentList,
    endpoint: `posts/${id}/comments	`,
  },
})

// Create a comment
export const COMMENT_CREATE_REQUEST = 'COMMENT_CREATE_REQUEST'
export const COMMENT_CREATE_SUCCESS = 'COMMENT_CREATE_SUCCESS'
export const COMMENT_CREATE_ERROR = 'COMMENT_CREATE_ERROR'

export const createComment = (comment: CommentType) => ({
  comment,
  callAPI: {
    types: [
      COMMENT_CREATE_REQUEST,
      COMMENT_CREATE_SUCCESS,
      COMMENT_CREATE_ERROR,
    ],
    method: 'POST',
    body: comment,
    schema: schemas.comment,
    endpoint: 'comments',
  },
})

// Edit a comment
export const COMMENT_EDIT_REQUEST = 'COMMENT_EDIT_REQUEST'
export const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS'
export const COMMENT_EDIT_ERROR = 'COMMENT_EDIT_ERROR'

export const editComment = (id: string, comment: CommentType) => ({
  id,
  comment,
  callAPI: {
    types: [COMMENT_EDIT_REQUEST, COMMENT_EDIT_SUCCESS, COMMENT_EDIT_ERROR],
    method: 'PUT',
    body: comment,
    schema: schemas.comment,
    endpoint: `comments/${id}`,
  },
})

// Delete a comment
export const COMMENT_DELETE_REQUEST = 'COMMENT_DELETE_REQUEST'
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS'
export const COMMENT_DELETE_ERROR = 'COMMENT_DELETE_ERROR'

export const deleteComment = (id: string) => ({
  id,
  callAPI: {
    types: [
      COMMENT_DELETE_REQUEST,
      COMMENT_DELETE_SUCCESS,
      COMMENT_DELETE_ERROR,
    ],
    method: 'DELETE',
    endpoint: `comments/${id}`,
  },
})

// Vote a comment
export const COMMENT_VOTE_REQUEST = 'COMMENT_VOTE_REQUEST'
export const COMMENT_VOTE_SUCCESS = 'COMMENT_VOTE_SUCCESS'
export const COMMENT_VOTE_ERROR = 'COMMENT_VOTE_ERROR'

export const voteComment = (id: string, vote: string) => ({
  id,
  vote,
  callAPI: {
    types: [COMMENT_VOTE_REQUEST, COMMENT_VOTE_SUCCESS, COMMENT_VOTE_ERROR],
    method: 'POST',
    body: { option: vote },
    schema: schemas.comment,
    endpoint: `comments/${id}`,
  },
})

// Change sort order of comments
export const COMMENTS_CHANGE_SORT = 'COMMENTS_CHANGE_SORT'

export const sortComments = (sortOrder: string) => ({
  type: COMMENTS_CHANGE_SORT,
  sortOrder,
})
