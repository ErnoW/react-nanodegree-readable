import {
  COMMENTS_REQUEST,
  COMMENTS_ERROR,
  COMMENTS_SUCCESS,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_SUCCESS,
} from '../actions'

type State = {
  isFetching: boolean,
  hasError: boolean,
  comments: Array<string>,
}
type Action = any // TODO: make more specific

const initialState = {
  isFetching: false,
  hasError: false,
  comments: [],
}

const displayComments = (
  state: State = initialState,
  action: Action,
): Action => {
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
