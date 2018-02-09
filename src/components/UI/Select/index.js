import React from 'react'
import InputField from '../InputField'
import styles from './Select.module.css'

const Select = ({
  field,
  error,
  label,
  id,
  name,
  inline,
  onChange,
  selected,
  ...props
}) => {
  id = id || name

  return (
    <InputField error={error} label={label} id={id} inline={inline}>
      <select
        className={styles.select}
        id={id}
        value={selected}
        onChange={(event) => onChange(event.target.value)}
        {...field}
        {...props}
      >
        {props.placeholder &&
          !selected && (
            <option value="" selected disabled>
              {props.placeholder}
            </option>
          )}
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    </InputField>
  )
}

Select.defaultProps = {}

export default Select
