import { POSTS_REQUEST, POSTS_ERROR, POSTS_SUCCESS } from '../actions'

type State = {
  isFetching: boolean,
  hasError: boolean,
  posts: { [string]: Array<string> },
}
type Action = any // TODO: make more specific

const initialState = {
  isFetching: false,
  hasError: false,
  posts: {},
}

const fetchedPosts = (state: State = initialState, action: Action): State => {
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
