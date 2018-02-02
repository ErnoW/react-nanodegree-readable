import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ field, ...props }) => {
  const id = props.id || props.name

  return (
    <div className="field">
      <label htmlFor={id}>
        {props.label}
        <input type="text" id={id} {...field} {...props} />
      </label>
      {props.error && <span>{props.error}</span>}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  id: '',
  error: '',
  disabled: false,
  placeholder: '',
}

export default Input
