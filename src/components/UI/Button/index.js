import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = (props) => {
  return (
    <button
      className={`${styles.button} ${props.type === 'submit' && styles.submit}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  type: 'button',
  onClick: null,
  disabled: false,
}

export default Button
