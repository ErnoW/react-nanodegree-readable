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
