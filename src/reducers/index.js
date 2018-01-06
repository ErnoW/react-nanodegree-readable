import merge from 'lodash/merge'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions/index'

//TODO: can I do this better with normalisr??
const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.payload.categories
    default:
      return state
  }
}

const filteredPosts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.category]: [...action.payload.result],
      }
    default:
      return state
  }
}

// Updates an entity cache in response to any action with payload.entities.
const entities = (state = { posts: {} }, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities) // TODO: check if merge is needed, or can i use spread operator
  }
  return state
}

const reducers = {
  entities,
  categories,
  filteredPosts,
}

export default reducers
