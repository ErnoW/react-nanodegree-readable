import React from 'react'
import { ReactComponent as SvgHeart } from '../../assets/svgs/heart.svg'
import styles from './Vote2.module.css'

const Vote2 = (props) => {
  return (
    <span>
      <SvgHeart className={`${styles.vote} icn`} onClick={props.onVote} />
      {props.count}
    </span>
  )
}

export default Vote2
