import React from 'react'
import styles from './InputField.module.css'

const InputField = (props) => {
  const inline = true

  return (
    <div className={styles.field}>
      <label
        className={`${styles.group} ${inline && styles.inline}`}
        htmlFor={props.id}
      >
        <span className={styles.label}>{props.label}</span>
        {props.children}
      </label>
      {props.error && <span className={styles.error}>{props.error}</span>}
    </div>
  )
}

export default InputField
