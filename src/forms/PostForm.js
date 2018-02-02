import React from 'react'
import PropTypes from 'prop-types'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { firstCap } from '../utils/format'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Select from '../components/Select'
import Button from '../components/Button'
import Notification from '../components/Notification'

const PostForm = (props) => {
  const { errors, touched, isSubmitting, isValid, handleReset, status } = props
  return (
    <Form>
      {status && <Notification text={status} />}
      <Field
        component={Input}
        name="title"
        label="Title"
        placeholder="The title of your post"
        error={touched.title && errors.title && firstCap(errors.title)}
      />
      <Field
        component={Input}
        name="author"
        label="Author"
        placeholder="Your name"
        error={touched.author && errors.author && firstCap(errors.author)}
      />
      <Field
        component={TextArea}
        name="body"
        label="Body"
        placeholder="Writy your post..."
        error={touched.body && errors.body && firstCap(errors.body)}
      />
      <Field
        component={Select}
        name="category"
        label="Category"
        placeholder="What category does this post belong to?"
        options={props.categories}
        error={touched.category && errors.category && firstCap(errors.category)}
      />
      <Button type="submit" text="Submit" disabled={isSubmitting || !isValid} />
      <Button type="reset" text="Reset" onClick={handleReset} />
    </Form>
  )
}

PostForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  status: PropTypes.string,
}

PostForm.defaultProps = {
  status: '',
}

const formikConfig = {
  mapPropsToValues: (props) => ({
    title: props.title || '',
    author: props.author || '',
    body: props.body || '',
    category: props.category || '',
  }),
  handleSubmit: (values, { setSubmitting, props, resetForm, setStatus }) => {
    setSubmitting(true)
    props.handleSubmit(values).then(
      () => {
        setSubmitting(false)
        resetForm()
      },
      (error) => {
        setSubmitting(false)
        setStatus(error.message)
      },
    )
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    body: Yup.string().required(),
    category: Yup.string().required(),
  }),
}

export default withFormik(formikConfig)(PostForm)