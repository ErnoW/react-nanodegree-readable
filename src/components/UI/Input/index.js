import React from 'react'
import PropTypes from 'prop-types'
import InputField from '../InputField'
import styles from './Input.module.css'

const Input = ({ field, error, label, id, autoComplete, ...props }) => {
  id = id || props.name
  autoComplete = autoComplete || 'off'

  return (
    <InputField error={error} label={label} id={id}>
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

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  id: '',
  error: '',
  disabled: false,
  placeholder: '',
}

export default Input
