import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navigation = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Navigation
