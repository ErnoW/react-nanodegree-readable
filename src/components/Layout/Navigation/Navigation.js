import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
// $FlowFixMe Error with Create React App creating ReactComponent
import { ReactComponent as Logo } from 'assets/svgs/logo.svg'

type Props = {
  links: Array<{ path: string, name: string }>,
}

const Navigation = (props: Props) => {
  const { links } = props
  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <ul className={styles.menu}>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
