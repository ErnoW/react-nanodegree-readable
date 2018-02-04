import React from 'react'
import InputField from '../InputField'
import styles from './Input.module.css'

const Input = ({
  field,
  error,
  label,
  id,
  autoComplete,
  inline,
  name,
  ...props
}) => {
  id = id || name

  return (
    <InputField error={error} label={label} id={id} inline={inline}>
      <input
        className={styles.input}
        type="text"
        id={id}
        {...field}
        {...props}
        autoComplete={autoComplete}
      />
    </InputField>
  )
}

Input.defaultProps = {
  autoComplete: 'off',
}

export default Input
