import React from 'react'
import InputField from 'components/UI/InputField'
import styles from './TextArea.module.css'
import type { FieldType } from 'types/components'

type Props = {
  name: string,
  id?: string,
  label: string,
  placeholder: string,
  rows: number,
  error: string,
  field: FieldType,
}

const TextArea = (props: Props) => {
  const { label, placeholder, rows, error, field } = props
  const name = props.name || field.name
  const id = props.id || name

  return (
    <InputField error={error} label={label} id={id}>
      <textarea
        className={styles.textarea}
        type="text"
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...field}
      />
    </InputField>
  )
}

TextArea.defaultProps = {
  rows: 5,
}

export default TextArea
