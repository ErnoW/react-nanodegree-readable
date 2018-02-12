import * as React from 'react'
import styles from './InputField.module.css'

type Props = {
  id: string,
  label: string,
  error?: string,
  inline?: boolean,
  children?: React.Node,
}

const InputField = (props: Props) => {
  const { id, label, error, inline } = props
  return (
    <div className={styles.field}>
      <label
        className={`${styles.group} ${inline === true ? styles.inline : ''}`}
        htmlFor={id}
      >
        <span className={styles.label}>{label}</span>
        {props.children}
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

InputField.defaultProps = {
  inline: false,
}

export default InputField
