import { normalize } from 'normalizr'
import * as api from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const ERROR_POSTS = 'ERROR_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
})

// //

/*
export const recieveAllCategories = payload => ({
  type: RECIEVE_ALL_CATEGORIES,
  payload
})

export const getAllCategories = () => dispatch => (
  Api.getCategoryList()
    .then(categories => dispatch(recieveAllCategories(categories)))
)
*/

// /
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

  return api.getCategorizedPosts(category).then(
    (payload) => {
      dispatch(receivePosts(category, normalize(payload, api.schemas.postList)))
    },
    () => {
      dispatch(errorPosts(category))
    },
  )
}

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories)
  return api.getCategories().then((payload) => {
    dispatch(receiveCategories(payload))
  })
}
