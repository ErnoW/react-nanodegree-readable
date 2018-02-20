import { CATEGORIES_SUCCESS } from 'actions'

type State = Array<{ name: string, path: string }>
type Action = any // TODO: make more specific

const initialState = []

const categories = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return action.payload.categories
    default:
      return state
  }
}

export default categories
