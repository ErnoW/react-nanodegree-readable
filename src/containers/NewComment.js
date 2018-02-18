import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import CommentForm from '../forms/CommentForm'
import { createComment } from '../actions/index'

type Props = {
  categories: Array<{ name: string }>,
  createComment: ({
    id: string,
    timestamp: number,
    body: string,
    author: string,
  }) => mixed,
}

class NewComment extends Component<Props> {
  handleSubmit = (values) => {
    console.log(this.props)
    return this.props.createComment({
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: this.props.match.params.id,
      body: values.comment,
      author: values.author,
    })
  }

  render() {
    const categories = this.props.categories.map((category) => ({
      value: category.name,
    }))

    return (
      <Fragment>
        <h2>Comments</h2>
        <CommentForm handleSubmit={this.handleSubmit} categories={categories} />
      </Fragment>
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
