import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import uuidv1 from 'uuid/v1'
import PostForm from '../forms/PostForm'
import { createPost } from '../actions/index'

type Props = {
  push: (path: string) => mixed,
  categories: Array<{ name: string }>,
  createPost: ({
    id: string,
    timestamp: number,
    title: string,
    body: string,
    author: string,
    category: string,
  }) => Promise<any>,
}
class NewPost extends Component<Props> {
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

    return (
      <div className="container">
        <PostForm handleSubmit={this.handleSubmit} categories={categories} />
      </div>
    )
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
