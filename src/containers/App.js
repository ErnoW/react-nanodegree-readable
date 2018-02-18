import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import { loadCategories } from '../actions'
import Navigation from './NavigationContainer'
import PostList from './PostListContainer'
import Post from './PostContainer'
import NewPost from './NewPost'
import Home from './Home'
import NotFound from './NotFound'

type Props = {
  loadCategories: () => mixed,
}
class App extends Component<Props> {
  componentWillMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Switch>
            <Route path="/" exact component={PostList} />
            <Route path="/category/:category" exact component={PostList} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/newpost" exact component={NewPost} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
})

export default withRouter(connect(null, mapDispatchToProps)(App))
