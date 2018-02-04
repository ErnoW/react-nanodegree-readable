import React from 'react'
import InputField from '../InputField'
import styles from './Select.module.css'

const Select = ({ field, error, label, id, name, inline, ...props }) => {
  id = id || name

  return (
    <InputField error={error} label={label} id={id} inline={inline}>
      <select className={styles.select} id={id} {...field} {...props}>
        {props.placeholder && (
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
