import React from 'react'
import InputField from 'components/UI/InputField'
import styles from './Select.module.css'
import type { FieldType } from 'types/components'

type Props = {
  name: string,
  id?: string,
  label: string,
  placeholder?: string,
  onChange?: (SyntheticInputEvent<EventTarget>) => mixed,
  selected?: string,
  error?: string,
  inline?: boolean,
  field?: FieldType,
  options: Array<{ value: string, label: string }>,
}

const Select = (props: Props) => {
  const {
    name,
    label,
    placeholder,
    error,
    options,
    selected,
    inline,
    field,
  } = props

  // $FlowFixMe Assume onChange or field.onChange is defined
  const onChange = props.onChange || field.onChange
  const id = props.id || name

  return (
    <InputField error={error} label={label} id={id} inline={inline}>
      <select
        className={styles.select}
        id={id}
        value={selected}
        onChange={(event) => onChange(event.target.value)}
        {...field}
      >
        {placeholder &&
          !selected && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    </InputField>
  )
}

export default Select
