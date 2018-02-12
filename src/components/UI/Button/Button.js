import React from 'react'
import styles from './Button.module.css'

type Props = {
  type: 'button' | 'submit' | 'reset',
  disabled: boolean,
  text: string,
  onClick?: () => mixed,
}

const Button = (props: Props) => {
  const { type, disabled, text, onClick } = props
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
