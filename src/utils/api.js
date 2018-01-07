import { schema } from 'normalizr'

const API_ROOT = 'http://localhost:3001'
const headers = { Authorization: 'RANDOM_TOKEN' }

// Define schemes by using normalizr
// see: https://github.com/paularmstrong/normalizr

const postSchema = new schema.Entity(
  'posts',
  {},
  {
    idAttribute: 'id',
  },
)

const commentSchema = new schema.Entity(
  'comments',
  {},
  {
    idAttribute: 'id',
  },
)

export const schemas = {
  post: postSchema,
  postList: [postSchema],
  comment: commentSchema,
  commentList: [commentSchema],
}

export const apiCall = (path) => {
  const apiLog = {}
  apiLog.root = `${API_ROOT}/${path}` //TEST

  return fetch(`${API_ROOT}/${path}`, {
    headers,
  })
    .then(
      (r) =>
        new Promise((resolve) =>
          setTimeout(() => resolve(r), 1000 + Math.random() * 500),
        ),
    ) //TESTING PUTPOSE ONLY
    .then((response) => {
      apiLog.response = response //TEST
      if (!response.ok) {
        throw Error(response.statusText)
        console.groupEnd(`Api Call to ${apiLog.root}`) // eslint-disable-line
      }
      return response.json()
    })
    .then((json) => {
      apiLog.json = json //TEST
      console.groupCollapsed(`Api Call to ${apiLog.root}`) // eslint-disable-line
      console.log('root', apiLog.root) // eslint-disable-line
      console.log('response', apiLog.response) // eslint-disable-line
      console.log('json', apiLog.json) // eslint-disable-line
      console.groupEnd(`Api Call to ${apiLog.root}`) // eslint-disable-line

      return json
    })
}

export const getCategories = () => apiCall('categories') // categoryListSchema
export const getCategorizedPosts = (category) => apiCall(`${category}/posts`)
export const getAllPosts = () => apiCall('posts')
export const getPost = (id) => apiCall(`posts/${id}`)
export const getComments = (id) => apiCall(`posts/${id}/comments`)
