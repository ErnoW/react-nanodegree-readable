import React from 'react'
// import PropTypes from 'prop-types'
import InputField from '../InputField'
import styles from './TextArea.module.css'

const TextArea = ({ field, error, label, id, ...props }) => {
  id = id || props.name

  return (
    <InputField error={error} label={label} id={id}>
      <textarea
        className={styles.textarea}
        type="text"
        id={id}
        {...field}
        {...props}
      />
    </InputField>
  )
}

export default TextArea
