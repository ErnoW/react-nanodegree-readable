import React from 'react'
import styles from './Button.module.css'

const Button = (
  type: string,
  disabled: boolean,
  text: string,
  onClick?: () => mixed,
) => {
  return (
    <button
      className={`${styles.button} ${type === 'submit' ? styles.submit : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
}

export default Button
