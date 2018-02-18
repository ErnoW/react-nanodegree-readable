import { POST_REQUEST, POST_ERROR, POST_SUCCESS } from '../actions'

const initialState = {
  isFetching: false,
  hasError: false,
  id: '',
}

const displayPost = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        isFetching: true,
        hasError: false,
        id: '',
      }
    case POST_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    case POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: action.payload.entities.result === undefined, //Post has been deleted
        id: action.payload.result,
      }
    default:
      return state
  }
}

export default displayPost
