import React from 'react'

const Notification = (props) => {
  return props.text && <div>{props.text}</div>
}

export default Notification
