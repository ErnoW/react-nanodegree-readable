import merge from 'lodash/merge'

const entities = (state = { posts: {}, comments: {} }, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities) // TODO: check if merge is needed, or can i use spread operator
  }
  return state
}

export default entities
