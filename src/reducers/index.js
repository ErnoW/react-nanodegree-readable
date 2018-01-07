import merge from 'lodash/merge'
import {
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  ERROR_POSTS,
  RECEIVE_POSTS,
} from '../actions/index'

//TODO: can I do this better with normalisr??
const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.payload.categories
    default:
      return state
  }
}

const initialLoading = (state = true, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return false
    default:
      return state
  }
}

const fetchedPosts = (
  state = {
    isFetching: false,
    hasError: false,
    posts: {},
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      }
    case ERROR_POSTS:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        posts: {
          ...state.posts,
          [action.category]: [...action.payload.result],
        },
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
  fetchedPosts,
  initialLoading,
}

export default reducers
