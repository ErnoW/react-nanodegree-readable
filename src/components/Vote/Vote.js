import React from 'react'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as SvgHeart } from '../../assets/svgs/heart.svg'
import styles from './Vote.module.css'

type Props = {
  onVote: (id: string, voteType: string) => mixed,
  count: number,
}

const Vote = (props: Props) => {
  return (
    <span>
      <SvgHeart className={`${styles.vote} icn`} onClick={props.onVote} />
      {props.count}
    </span>
  )
}

export default Vote
