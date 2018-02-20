import React from 'react'
import InputField from 'components/UI/InputField'
import styles from './Input.module.css'
import type { FieldType } from 'types/components'

type Props = {
  name: string,
  id?: string,
  label: string,
  placeholder: string,
  error: string,
  autoComplete: boolean,
  inline: boolean,
  field: FieldType,
}

const Input = (props: Props) => {
  const { label, placeholder, error, autoComplete, inline, field } = props
  const name = props.name || field.name
  const id = props.id || name

  return (
    <InputField error={error} label={label} id={id} inline={inline}>
      <input
        className={styles.input}
        type="text"
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...field}
      />
    </InputField>
  )
}

Input.defaultProps = {
  autoComplete: 'off',
}

export default Input
