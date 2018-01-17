import { CATEGORIES_SUCCESS } from '../actions'

const initialState = []

const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return action.payload.categories
    default:
      return state
  }
}

export default categories
