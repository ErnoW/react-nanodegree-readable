import PropTypes from 'prop-types'

export const PostType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
})

export const CommentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  parentId: PropTypes.string.isRequired,
  parentDeleted: PropTypes.bool.isRequired,
  voteScore: PropTypes.number.isRequired,
})

export const CategoryType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
})
