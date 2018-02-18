import {
  COMMENTS_REQUEST,
  COMMENTS_ERROR,
  COMMENTS_SUCCESS,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_SUCCESS,
} from '../actions'

const initialState = {
  isFetching: false,
  hasError: false,
  comments: [],
}

const displayComments = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      }
    case COMMENTS_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        comments: [...action.payload.result],
      }
    case COMMENT_CREATE_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload.result],
      }
    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment !== action.id),
      }
    default:
      return state
  }
}

export default displayComments
