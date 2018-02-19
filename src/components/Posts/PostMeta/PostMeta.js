import * as React from 'react'
import styles from './PostMeta.module.css'

type Props = {
  children?: React.Node,
}

const PostMeta = (props: Props) => {
  return <div className={styles.container}>{props.children}</div>
}

export default PostMeta
