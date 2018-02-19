import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { loadCategories } from '../actions'
import Navigation from './NavigationContainer'
import PostList from './PostListContainer'
import Post from './PostContainer'
import NewPost from './NewPost'
import NotFound from './NotFound'

type Props = {
  loadCategories: () => Promise<any>,
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
