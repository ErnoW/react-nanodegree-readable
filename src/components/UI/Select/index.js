import React from 'react'
import PropTypes from 'prop-types'
import InputField from '../InputField'
import styles from './Select.module.css'

const Select = ({ field, error, label, id, ...props }) => {
  id = id || props.name

  return (
    <InputField error={error} label={label} id={id}>
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

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    }),
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
}

Select.defaultProps = {
  placeholder: '',
  id: '',
  selected: null,
  error: '',
  disabled: false,
}

export default Select
