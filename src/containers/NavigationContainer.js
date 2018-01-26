import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CategoryType } from '../utils/PropTypes'
import Navigation from '../components/Navigation'

class NavigationContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(CategoryType).isRequired,
  }
  render() {
    const links = [
      {
        name: 'Home',
        path: '/',
      },
      ...this.props.categories.map((category) => ({
        name: category.name,
        path: `/category/${category.path}`,
      })),
      {
        name: 'New post',
        path: '/newpost',
      },
    ]

    return <Navigation links={links} />
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

export default connect(mapStateToProps, null)(NavigationContainer)
