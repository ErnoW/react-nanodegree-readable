import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import CommentForm from '../forms/CommentForm'
import { createComment } from '../actions/index'

type Props = {
  parentId: string,
  categories: Array<{ name: string }>,
  createComment: ({
    id: string,
    timestamp: number,
    parentId: string,
    body: string,
    author: string,
  }) => mixed,
}

class NewComment extends Component<Props> {
  handleSubmit = (values) =>
    this.props.createComment({
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: this.props.parentId,
      body: values.comment,
      author: values.author,
    })

  render() {
    const categories = this.props.categories.map((category) => ({
      value: category.name,
    }))

    return (
      <CommentForm handleSubmit={this.handleSubmit} categories={categories} />
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)
