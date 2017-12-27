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
  console.group('apiCall') // eslint-disable-line
  console.log('fetching from', `${API_ROOT}/${path}`) // eslint-disable-line
  return fetch(`${API_ROOT}/${path}`, {
    headers,
  })
    .then((response) => {
      console.log('response', response) // eslint-disable-line
      return response.json()
    })
    .then((json) => {
      console.log('json', json) // eslint-disable-line
      console.groupEnd('apiCall') // eslint-disable-line
      return json
    })
}

export const getCategories = () => apiCall('categories') // categoryListSchema
export const getCategorizedPosts = (category) =>
  apiCall(`${category}/posts`, postListSchema)
export const getAllPosts = () => apiCall('posts', postListSchema)
