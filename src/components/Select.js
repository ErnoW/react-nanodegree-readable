import React from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {
  const id = props.id || props.name

  return (
    <div className="field">
      <label htmlFor={id}>
        {props.label}
        <select
          name={props.name}
          id={id}
          value={props.selected}
          onChange={props.controlFunc}
          disabled={props.disabled}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
      </label>
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
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

Select.defaultProps = {
  placeholder: '',
  id: '',
  selected: null,
  disabled: false,
}

export default Select
