import React from 'react'
import styles from './Button.module.css'

type Props = {
  type: 'button' | 'submit' | 'reset',
  disabled: boolean,
  text: string,
  onClick?: () => mixed,
  linkButton: boolean,
}

const Button = (props: Props) => {
  const { type, disabled, text, onClick, linkButton } = props
  return (
    <button
      className={`${styles.button} ${type === 'submit' ? styles.submit : ''} ${
        linkButton === true ? styles.link : ''
      }`}
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
  linkButton: false,
}

export default Button
