import React from 'react'

type Props = {
  type: 'error' | 'info' | 'warning' | 'success',
  text: string,
}

const Notification = (props: Props) => {
  return props.text && <span>{props.text}</span>
}

Notification.defaultProps = {
  type: 'info',
}

export default Notification
