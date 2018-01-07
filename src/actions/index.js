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

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
})

export const requestCategories = {
  type: REQUEST_CATEGORIES,
}

export const receiveCategories = (payload) => ({
  type: RECEIVE_CATEGORIES,
  payload,
})

export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category,
})

export const errorPosts = (category) => ({
  type: ERROR_POSTS,
  category,
})

export const receivePosts = (category, payload) => ({
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

export const requestPost = (id) => ({
  type: REQUEST_POST,
  id,
})

export const errorPost = (id) => ({
  type: ERROR_POST,
  id,
})

export const receivePost = (id, payload) => ({
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

export const requestComments = (id) => ({
  type: REQUEST_COMMENTS,
  id,
})

export const errorComments = (id) => ({
  type: ERROR_COMMENTS,
  id,
})

export const receiveComments = (id, payload) => ({
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
