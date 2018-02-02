import React from 'react'
import PropTypes from 'prop-types'

const TextArea = (props) => {
  const id = props.id || props.name

  return (
    <div className="field">
      <label htmlFor={id}>
        {props.label}
        <textarea
          name={props.name}
          id={id}
          value={props.value}
          onChange={props.controlFunc}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      </label>
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

TextArea.defaultProps = {
  placeholder: '',
  id: '',
  disabled: false,
}

export default TextArea
