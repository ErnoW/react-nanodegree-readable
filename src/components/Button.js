import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </button>
  )
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  type: 'button',
  onClick: null,
  disabled: false,
}

export default Input
