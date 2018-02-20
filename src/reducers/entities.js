import merge from 'lodash/merge'
import type { PostType, CommentType } from 'types/data'

type State = {
  posts: { [string]: PostType },
  comments: { [string]: CommentType },
}
type Action = any // TODO: make more specific

const entities = (
  state: State = { posts: {}, comments: {} },
  action: Action,
): State => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities) // TODO: check if merge is needed, or can i use spread operator
  }
  return state
}

export default entities
