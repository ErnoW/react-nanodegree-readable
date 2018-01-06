import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CategoryType } from '../utils/PropTypes'

class Navigation extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
  }

  static defaultProps = {
    categories: [],
  }

  render() {
    return (
      <ul>
        {this.props.categories.map((category) => (
          <li key={category.name}>
            <Link to={`/category/${category.path}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

export default connect(mapStateToProps, null)(Navigation)
