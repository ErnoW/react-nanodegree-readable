import React from 'react'

type Props = {
  text: string,
}

const Notification = (props: Props) => {
  return props.text && <div>{props.text}</div>
}

export default Notification
