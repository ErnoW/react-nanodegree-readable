import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import uuidv1 from 'uuid/v1'
import { CategoryType } from '../utils/PropTypes'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Select from '../components/Select'
import Button from '../components/Button'
import { createPost } from '../actions/index'

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
    isPosting: false,
  }

  static propTypes = {
    categories: PropTypes.arrayOf(CategoryType).isRequired,
    createPost: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleInputChange = (event) => {
    const input = event.target.name
    const value = event.target.value

    this.setState({ [input]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    //TODO: check better validation?
    if (
      this.state.isPosting ||
      this.state.title === '' ||
      this.state.body === '' ||
      this.state.author === '' ||
      this.state.category === ''
    ) {
      return
    }

    const id = uuidv1()

    this.setState({ isPosting: true })
    this.props
      .createPost({
        id,
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
      })
      .then(() => this.props.push(`/post/${id}`))
  }

  handleReset = () => {
    this.setState({
      title: '',
      author: '',
      category: '',
      body: '',
    })
  }

  render() {
    const { title, author, category, body } = this.state
    const categories = this.props.categories.map((category) => ({
      value: category.name,
    }))

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            label="Title"
            value={title}
            controlFunc={this.handleInputChange}
            placeholder="test"
            disabled={this.state.isPosting}
          />
          <Input
            name="author"
            label="Author"
            value={author}
            controlFunc={this.handleInputChange}
            placeholder="test"
            disabled={this.state.isPosting}
          />
          <TextArea
            name="body"
            label="Post"
            value={body}
            controlFunc={this.handleInputChange}
            placeholder="test"
            disabled={this.state.isPosting}
          />
          <Select
            name="category"
            label="Category"
            options={categories}
            selected={category}
            controlFunc={this.handleInputChange}
            placeholder="select category"
            disabled={this.state.isPosting}
          />
          <Button text="Create new post" type="submit" />
          <Button text="Reset" type="reset" onClick={this.handleReset} />
        </form>
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
