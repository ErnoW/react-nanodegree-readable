import merge from 'lodash/merge'
import {
  RECEIVE_CATEGORIES,
  CHANGE_POSTSORT,
  CHANGE_COMMENTSORT,
  REQUEST_POSTS,
  ERROR_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  ERROR_POST,
  RECEIVE_POST,
  REQUEST_COMMENTS,
  ERROR_COMMENTS,
  RECEIVE_COMMENTS,
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

const sortPosts = (state = 'timestamp', action) => {
  switch (action.type) {
    case CHANGE_POSTSORT:
      return action.sortOrder
    default:
      return state
  }
}

const sortComments = (state = 'timestamp', action) => {
  switch (action.type) {
    case CHANGE_COMMENTSORT:
      return action.sortOrder
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

const displayPost = (
  state = {
    isFetching: false,
    hasError: false,
    id: '',
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        isFetching: true,
        hasError: false,
        id: '',
      }
    case ERROR_POST:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case RECEIVE_POST:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        id: action.payload.result,
      }
    default:
      return state
  }
}

const displayComments = (
  state = {
    isFetching: false,
    hasError: false,
    comments: [],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      }
    case ERROR_COMMENTS:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        comments: [...action.payload.result],
      }
    default:
      return state
  }
}

// Updates an entity cache in response to any action with payload.entities.
const entities = (state = { posts: {}, comments: {} }, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities) // TODO: check if merge is needed, or can i use spread operator
  }
  return state
}

const reducers = {
  entities,
  categories,
  fetchedPosts,
  displayPost,
  displayComments,
  initialLoading,
  sortPosts,
  sortComments,
}

export default reducers
