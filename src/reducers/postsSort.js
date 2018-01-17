import { POSTS_CHANGE_SORT } from '../actions'

const initialState = 'timestamp'

const sortPosts = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_CHANGE_SORT:
      return action.sortOrder
    default:
      return state
  }
}

export default sortPosts
