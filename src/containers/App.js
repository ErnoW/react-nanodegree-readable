import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import { loadCategories } from '../actions'
import NavigationContainer from './NavigationContainer'
import PostListContainer from './PostListContainer'
import Post from './Post'
import NewPost from './NewPost'
import Home from './Home'
import NotFound from './NotFound'

class App extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
        <NavigationContainer />
        <main className="main-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/category/:category"
              exact
              component={PostListContainer}
            />
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
