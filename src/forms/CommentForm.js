import React from 'react'
import PropTypes from 'prop-types'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { firstCap } from '../utils/format'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import Notification from '../components/Notification'

const PostForm = (props) => {
  const { errors, touched, isSubmitting, isValid, handleReset, status } = props
  return (
    <Form>
      {status && <Notification text={status} />}
      <Field
        component={Input}
        name="author"
        label="Author"
        placeholder="Your name"
        error={touched.author && errors.author && firstCap(errors.author)}
      />
      <Field
        component={TextArea}
        name="comment"
        label="Comment"
        placeholder="Writy your comment..."
        error={touched.comment && errors.comment && firstCap(errors.comment)}
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
    author: props.author || '',
    comment: props.comment || '',
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
    author: Yup.string().required(),
    comment: Yup.string().required(),
  }),
}

export default withFormik(formikConfig)(PostForm)