import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { firstCap } from '../utils/format'
import Input from '../components/UI/Input'
import TextArea from '../components/UI/TextArea'
import Button from '../components/UI/Button'
import Notification from '../components/Notification'

type Props = {
  errors: { [string]: string },
  touched: { [string]: boolean },
  isSubmitting: boolean,
  handleReset: () => mixed,
  status: string,
}

const PostForm = (props: Props) => {
  const { errors, touched, isSubmitting, handleReset, status } = props
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
      <Button type="submit" text="Submit" disabled={isSubmitting} />
      <Button type="reset" text="Reset" onClick={handleReset} />
    </Form>
  )
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
