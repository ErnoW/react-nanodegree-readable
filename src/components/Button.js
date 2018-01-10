import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  )
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  onClick: PropTypes.func,
}

Input.defaultProps = {
  type: 'button',
  onClick: null,
}

export default Input
