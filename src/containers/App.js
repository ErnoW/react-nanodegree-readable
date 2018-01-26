import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import { loadCategories } from '../actions'
import NavigationContainer from './NavigationContainer'
import PostList from './PostList'
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category/:category" exact component={PostList} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/newpost" exact component={NewPost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
})

export default withRouter(connect(null, mapDispatchToProps)(App))
