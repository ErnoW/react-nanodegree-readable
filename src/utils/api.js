import { schema } from 'normalizr'

const API_ROOT = 'http://localhost:3001'
const headers = { Authorization: 'RANDOM_TOKEN' }

// Define schemes by using normalizr
// see: https://github.com/paularmstrong/normalizr
// const categorySchema = new schema.Entity(
//   'categories', {}, {
//     idAttribute: 'name',
//   },
// )

const postSchema = new schema.Entity(
  'posts',
  {},
  {
    idAttribute: 'id',
  },
)

const postListSchema = [postSchema]
// const categoryListSchema = [categorySchema];

export const schemas = {
  postList: postListSchema,
  // categoryList: categoryListSchema,
}

export const apiCall = (path) => {
  const apiLog = {}
  apiLog.root = `${API_ROOT}/${path}` //TEST

  return fetch(`${API_ROOT}/${path}`, {
    headers,
  })
    .then((response) => {
      apiLog.response = response //TEST
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
export const getCategorizedPosts = (category) =>
  apiCall(`${category}/posts`, postListSchema)
export const getAllPosts = () => apiCall('posts', postListSchema)
