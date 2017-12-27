import { normalize } from 'normalizr'
import * as api from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
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

export const receivePosts = (category, payload) => ({
  type: RECEIVE_POSTS,
  category,
  payload,
})

export const fetchPosts = (category) => (dispatch) => {
  dispatch(requestPosts(category))
  return api.getCategorizedPosts(category).then((payload) => {
    dispatch(receivePosts(category, normalize(payload, api.schemas.postList)))
  })
}

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories)
  return api.getCategories().then((payload) => {
    dispatch(receiveCategories(payload))
  })
}

/*

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  }
}

export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category,
})

export const receivePosts = (category, posts) => ({
  type: RECEIVE_POSTS,
  category,
  posts,
})
// 
// export function fetchPosts = (category) =>{
//   return function (dispatch) {
//     dispatch(requestPosts(category))
//     return fetch(`https://www.reddit.com/r/${category}.json`)
//       .then(
//         response => response.json(),
//         error => console.log('An error occurred.', error)
//       )
//       .then(json =>
//         dispatch(receivePosts(category, json))
//       )
//   }
// }
// 
export const fetchPosts = (category) => (dispatch) =>
  api
    .getCategoryPosts(category)
    .then((posts) => dispatch(receivePosts(category, posts)))


    
*/

/*
Actions:
selectCategory
requestAllPosts
*/

/*
export const receivePosts = (subreddit, json) => ({
  return ){
    type: RECEIVE_POSTS,
    category,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
  */
