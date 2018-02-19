import React from 'react'
import styles from './Notification.module.css'

type Props = {
  type: 'error' | 'info' | 'warning' | 'success',
  text: string,
}

const Notification = (props: Props) => {
  return (
    props.text && (
      <span className={`${styles.notification} ${styles[props.type]}`}>
        {props.text}
      </span>
    )
  )
}
//      className={`${styles.button} ${type === 'submit' ? styles.submit : ''}`}

Notification.defaultProps = {
  type: 'info',
}

export default Notification
