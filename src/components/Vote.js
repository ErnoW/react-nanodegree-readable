import React from 'react'
import PropTypes from 'prop-types'

const Vote = (props) => {
  return <button onClick={props.onClick}>Like</button>
}

Vote.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Vote
