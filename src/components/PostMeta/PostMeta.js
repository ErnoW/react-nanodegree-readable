import React from 'react'
import styles from './PostMeta.module.css'

const PostMeta = (props) => {
  return <div className={styles.container}>{props.children}</div>
}

export default PostMeta
