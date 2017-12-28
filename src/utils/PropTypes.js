import PropTypes from 'prop-types'

export const PostType = PropTypes.shape({
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  commentCount: PropTypes.number,
  voteScore: PropTypes.number,
  timestamp: PropTypes.number.isRequired,
})

export const PostTypeDefault = {
  author: 'unknow',
  commentCount: 0,
  voteScore: 0,
}

export const CategoryType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
})

export const CategoryTypeDefault = {
  name: '',
  path: '/',
}
