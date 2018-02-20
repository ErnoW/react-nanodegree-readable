import { COMMENTS_CHANGE_SORT } from 'actions'

type State = string
type Action = any // TODO: make more specific

const initialState = 'timestamp'

const sortComments = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case COMMENTS_CHANGE_SORT:
      return action.sortOrder
    default:
      return state
  }
}

export default sortComments
