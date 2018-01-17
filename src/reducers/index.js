import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import categories from './categories'
import entities from './entities'
import fetchedPosts from './fetchedPosts'
import commentsSort from './commentsSort'
import displayComments from './displayComments'
import displayPost from './displayPost'
import postsSort from './postsSort'

const reducer = combineReducers({
  categories,
  entities,
  fetchedPosts,
  displayComments,
  displayPost,
  commentsSort,
  postsSort,
  router: routerReducer,
})

export default reducer
