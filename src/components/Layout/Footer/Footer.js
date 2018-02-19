import React from 'react'
import styles from './Footer.module.css'
import { currentYear } from 'utils/format'

const Footer = () => {
  return (
    <footer className={`${styles.footer} container container-transparent`}>
      &copy; {currentYear(Date.now())} copyright Erno Wever -{' '}
      <a
        href="https://github.com/ErnoW/react-nanodegree-readable"
        target="_blank"
        rel="noopener noreferrer"
      >
        Project on Github
      </a>
    </footer>
  )
}

export default Footer
