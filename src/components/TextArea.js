import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ field, ...props }) => {
  const id = props.id || props.name

  return (
    <div className="field">
      <label htmlFor={id}>
        {props.label}
        <textarea id={id} {...field} {...props} />
      </label>
      {props.error && <span>{props.error}</span>}
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
}

TextArea.defaultProps = {
  placeholder: '',
  id: '',
  error: '',
  disabled: false,
}

export default TextArea
