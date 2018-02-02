import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ field, ...props }) => {
  const id = props.id || props.name

  return (
    <div className="field">
      <label htmlFor={id}>
        {props.label}
        <select id={id} {...field} {...props}>
          {props.placeholder && (
            <option value="" selected>
              {props.placeholder}
            </option>
          )}
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
      </label>
      {props.error && <span>{props.error}</span>}
    </div>
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
