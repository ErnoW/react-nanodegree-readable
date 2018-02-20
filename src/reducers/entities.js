import merge from 'lodash/merge'
import type { PostType, CommentType } from 'types/data'

import { POST_DELETE_SUCCESS } from 'actions'

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
    return merge({}, state, action.payload.entities)
  } else if (action.type === POST_DELETE_SUCCESS) {
    return merge({}, state, { posts: { [action.id]: action.payload } })
  }
  return state
}

export default entities
