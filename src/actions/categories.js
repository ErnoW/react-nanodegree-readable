export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR'

// Load all categories
export const loadCategories = () => ({
  callAPI: {
    types: [CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_ERROR],
    method: 'GET',
    endpoint: `categories`,
  },
})
