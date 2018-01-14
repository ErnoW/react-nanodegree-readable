import { normalize } from 'normalizr'
import * as api from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const ERROR_POSTS = 'ERROR_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POST = 'REQUEST_POST'
export const ERROR_POST = 'ERROR_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const ERROR_COMMENTS = 'ERROR_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const START_POST_POST = 'START_POST_POST'
export const FINISH_POST_POST = 'FINISH_POST_POST'

export const START_POST_VOTE = 'START_POST_VOTE'
export const FINISH_POST_VOTE = 'FINISH_POST_VOTE'

export const START_COMMENT_VOTE = 'START_COMMENT_VOTE'
export const FINISH_COMMENT_VOTE = 'FINISH_COMMENT_VOTE'

export const CHANGE_POSTSORT = 'CHANGE_POSTSORT'
export const CHANGE_COMMENTSORT = 'CHANGE_COMMENTSORT'

const requestCategories = {
  type: REQUEST_CATEGORIES,
}

export const changePostSort = (sortOrder) => ({
  type: CHANGE_POSTSORT,
  sortOrder,
})

export const changeCommentSort = (sortOrder) => ({
  type: CHANGE_COMMENTSORT,
  sortOrder,
})

const receiveCategories = (payload) => ({
  type: RECEIVE_CATEGORIES,
  payload,
})

const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category,
})

const errorPosts = (category) => ({
  type: ERROR_POSTS,
  category,
})

const receivePosts = (category, payload) => ({
  type: RECEIVE_POSTS,
  category,
  payload,
})

export const fetchPosts = (category) => (dispatch, getState) => {
  const state = getState()

  //Do not fetch if no categories are feched/exist
  if (state.categories.length === 0) {
    dispatch(errorPosts(category))
    return console.error('no categories defined', state.categories) // eslint-disable-line
  }

  //Do not fetch if the category is not valid
  if (state.categories.filter((cat) => cat.name === category).length === 0) {
    dispatch(errorPosts(category))
    return console.error('no valid category', getState().categories) // eslint-disable-line
  }

  dispatch(requestPosts(category))

  return api
    .getCategorizedPosts(category)
    .then((payload) => {
      dispatch(receivePosts(category, normalize(payload, api.schemas.postList)))
    })
    .catch(() => {
      dispatch(errorPosts(category))
    })
}

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories)
  return api.getCategories().then((payload) => {
    dispatch(receiveCategories(payload))
  })
}

const requestPost = (id) => ({
  type: REQUEST_POST,
  id,
})

const errorPost = (id) => ({
  type: ERROR_POST,
  id,
})

const receivePost = (id, payload) => ({
  type: RECEIVE_POST,
  id,
  payload,
})

export const fetchPost = (id) => (dispatch, getState) => {
  const state = getState()

  // Do not fetch post if has already been fetched
  if (state.entities.posts[id]) {
    return dispatch(fetchComments(id))
  }

  dispatch(requestPost(id))

  return api
    .getPost(id)
    .then((payload) => {
      dispatch(receivePost(id, normalize(payload, api.schemas.post)))
      dispatch(fetchComments(id))
    })
    .catch(() => {
      dispatch(errorPost(id))
    })
}

const requestComments = (id) => ({
  type: REQUEST_COMMENTS,
  id,
})

const errorComments = (id) => ({
  type: ERROR_COMMENTS,
  id,
})

const receiveComments = (id, payload) => ({
  type: RECEIVE_COMMENTS,
  id,
  payload,
})

export const fetchComments = (id) => (dispatch) => {
  dispatch(requestComments(id))
  return api
    .getComments(id)
    .then((payload) => {
      dispatch(receiveComments(id, normalize(payload, api.schemas.commentList)))
    })
    .catch(() => {
      dispatch(errorComments(id))
    })
}

const startPostPost = (post) => ({
  type: START_POST_POST,
  post,
})

const finishPostPost = (payload) => ({
  type: FINISH_POST_POST,
  payload,
})

export const createPost = (post) => (dispatch) => {
  dispatch(startPostPost(post))
  return api.postPost(post).then((payload) => {
    dispatch(finishPostPost(normalize(payload, api.schemas.post)))
    return payload
  })
}

const startPostVote = (id, vote) => ({
  type: START_POST_VOTE,
  id,
  vote,
})

const finishPostVote = (payload) => ({
  type: FINISH_POST_VOTE,
  payload,
})

export const addPostVote = (id, vote) => (dispatch) => {
  dispatch(startPostVote(id, vote))
  return api.postPostVote(id, vote).then((payload) => {
    dispatch(finishPostVote(normalize(payload, api.schemas.post)))
    return payload
  })
}

const startCommentVote = (id, vote) => ({
  type: START_COMMENT_VOTE,
  id,
  vote,
})

const finishCommentVote = (payload) => ({
  type: FINISH_COMMENT_VOTE,
  payload,
})

export const addCommentVote = (id, vote) => (dispatch) => {
  dispatch(startCommentVote(id, vote))
  return api.postCommentVote(id, vote).then((payload) => {
    dispatch(finishCommentVote(normalize(payload, api.schemas.comment)))
    return payload
  })
}
