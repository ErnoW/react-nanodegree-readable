import { POSTS_REQUEST, POSTS_ERROR, POSTS_SUCCESS } from '../actions'

const initialState = {
  isFetching: false,
  hasError: false,
  posts: {},
}

const fetchedPosts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      }
    case POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case POSTS_SUCCESS:
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

export default fetchedPosts
