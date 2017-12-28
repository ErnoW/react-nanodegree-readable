import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CategoryType } from '../utils/PropTypes'
import { selectCategory, fetchPosts } from '../actions'

class Navigation extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
    selectCategory: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  }

  static defaultProps = {
    categories: [],
  }
  render() {
    return (
      <ul>
        {this.props.categories.map((category) => (
          <li key={category.name}>
            <Link
              to={`/category/${category.path}`}
              onClick={() => {
                this.props.selectCategory(category.name)
                this.props.fetchPosts(category.name)
              }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStatetoProps(state) {
  return {
    categories: state.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchPosts: (category) => dispatch(fetchPosts(category)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Navigation)
