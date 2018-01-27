import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import uuidv1 from 'uuid/v1'
import PostForm from '../forms/PostForm'
import { createPost } from '../actions/index'

class NewPost extends Component {
  handleSubmit = (values) => {
    const id = uuidv1()

    return this.props
      .createPost({
        id,
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category,
      })
      .then(() => this.props.push(`/post/${id}`))
  }

  render() {
    const categories = this.props.categories.map((category) => ({
      value: category.name,
    }))

    return <PostForm handleSubmit={this.handleSubmit} categories={categories} />
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
  createPost: (post) => dispatch(createPost(post)),
  push: (path) => dispatch(push(path)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
