import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import type { StoreType } from '../types/store'

type Props = {
  categories: Array<{ name: string, path: string }>,
}
class NavigationContainer extends Component<Props> {
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

    return (
      <div className="container">
        <Navigation links={links} />
      </div>
    )
  }
}

const mapStateToProps = (state: StoreType): * => ({
  categories: state.categories,
})

export default connect(mapStateToProps, null)(NavigationContainer)
