import type { PostType, CommentType } from './data'

export type StoreType = {
  categories: Array<{ name: string, path: string }>,
  commentsSort: string,
  displayComments: {
    comments: Array<string>,
    hasError: boolean,
    isFetching: boolean,
  },
  displayPost: {
    id: string,
    hasError: boolean,
    isFetching: boolean,
  },
  fetchedPosts: {
    posts: { [string]: Array<string> },
    hasError: boolean,
    isFetching: boolean,
  },
  router: {
    location: {
      hash: string,
      key: string,
      pathname: string,
      search: string,
    },
    entities: {
      comments: { [string]: CommentType },
      posts: { [string]: PostType },
    },
  },
}
