import { POST_REQUEST, POST_ERROR, POST_SUCCESS } from '../actions'

type State = {
  isFetching: boolean,
  hasError: boolean,
  id: string,
}
type Action = any // TODO: make more specific

const initialState = {
  isFetching: false,
  hasError: false,
  id: '',
}

const displayPost = (state: State = initialState, action: Action): State => {
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
        hasError: action.payload.result === undefined, //Post has been deleted
        id: action.payload.result,
      }
    default:
      return state
  }
}

export default displayPost
