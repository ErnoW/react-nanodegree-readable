import React from 'react'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as UpVote } from '../../assets/svgs/upVote.svg'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as DownVote } from '../../assets/svgs/downVote.svg'
import styles from './Vote.module.css'

type Props = {
  onVote: (voteType: string) => mixed,
  count: number,
}

const Vote = (props: Props) => {
  return (
    <span>
      <DownVote
        className={`${styles.vote} icn`}
        onClick={() => props.onVote('downVote')}
      />
      <span className={styles.count}>{props.count}</span>
      <UpVote
        className={`${styles.vote} icn`}
        onClick={() => props.onVote('upVote')}
      />
    </span>
  )
}

export default Vote
