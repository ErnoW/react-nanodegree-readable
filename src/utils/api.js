import { schema, normalize } from 'normalizr'

const API_ROOT = 'http://localhost:3001'
const headers = { Authorization: 'RANDOM_TOKEN' }

// Define schemes by using normalizr. see: https://github.com/paularmstrong/normalizr
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

// Generic api calls
const apiGet = (endpoint, schema) => {
  return fetch(`${API_ROOT}/${endpoint}`, {
    headers,
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      if (schema) {
        return normalize(json, schema)
      }
      return json
    })
}

const apiPost = (endpoint, schema, body) => {
  return fetch(`${API_ROOT}/${endpoint}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      if (schema) {
        return normalize(json, schema)
      }
      return json
    })
}

const apiPut = (endpoint, schema, body) => {
  return fetch(`${API_ROOT}/${endpoint}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      if (schema) {
        return normalize(json, schema)
      }
      return json
    })
}

const apiDelete = (endpoint) => {
  return fetch(`${API_ROOT}/${endpoint}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
}

// Middleware for api calls
export const callAPIMiddleware = (store) => (next) => (action) => {
  const callAPI = action.callAPI

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, method, schema, types, body } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (
    method !== 'GET' &&
    method !== 'POST' &&
    method !== 'PUT' &&
    method !== 'DELETE'
  ) {
    throw new Error('Use a valid request type.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction.callAPI
    return finalAction
  }

  const [requestType, successType, failureType] = types

  next(actionWith({ type: requestType }))

  let apicall
  if (method === 'GET') {
    apicall = apiGet(endpoint, schema)
  } else if (method === 'PUT') {
    apicall = apiPut(endpoint, schema, body)
  } else if (method === 'DELETE') {
    apicall = apiDelete(endpoint)
  } else {
    apicall = apiPost(endpoint, schema, body)
  }

  return apicall
    .then((ms) => new Promise((resolve) => setTimeout(() => resolve(ms), 1000)))
    .then(
      (response) =>
        next(
          actionWith({
            payload: response,
            type: successType,
          }),
        ),
      (error) =>
        next(
          actionWith({
            type: failureType,
            error: error.message || 'Something bad happened',
          }),
        ),
    )
}
