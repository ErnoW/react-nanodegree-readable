import { COMMENTS_CHANGE_SORT } from '../actions'

const initialState = 'timestamp'

const sortComments = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_CHANGE_SORT:
      return action.sortOrder
    default:
      return state
  }
}

export default sortComments
