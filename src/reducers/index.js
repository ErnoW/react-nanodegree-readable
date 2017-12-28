import merge from 'lodash/merge'
import {
  SELECT_CATEGORY,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
} from '../actions/index'

const selectedCategory = (state = '', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

//TODO: can I do this better with normalisr??
const categories = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...Object.assign(
          {},
          ...action.payload.categories.map((item) => ({
            [item.name]: {
              ...state[item.name],
              ...item,
            },
          })),
        ),
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.category]: {
          ...state[action.category],
          posts: action.payload.result,
        },
      }
    default:
      return state
  }
}

// Updates an entity cache in response to any action with payload.entities.
const entities = (state = { posts: {} }, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities) // TODO: check if merge is needed, or can i use spread operator
  }
  return state
}

// Updates error message to notify about the failed fetches.
// const errorMessage = (state = null, action) => {
//   const { type, error } = action

//   if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//     return null
//   } else if (error) {
//     return error
//   }

//   return state
// }

/*
function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    posts: [],
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return merge(
        {},
        state,
        { isFetching: false, didInvalidate: false },
        action.response.entities,
      )
    default:
      return state
  }
}
*/

/*
const postsByCategory = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state
        //[action.category]: posts(state[action.category], action),
      }
    default:
      return state
  }
}
*/

const reducers = {
  entities,
  selectedCategory,
  categories,
}

export default reducers
