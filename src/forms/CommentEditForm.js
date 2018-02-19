import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { firstCap } from '../utils/format'
import TextArea from '../components/UI/TextArea'
import Button from '../components/UI/Button'
import Notification from '../components/UI/Notification'

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
        component={TextArea}
        name="comment"
        label="Comment"
        placeholder="Write your comment..."
        error={touched.comment && errors.comment && firstCap(errors.comment)}
        rows={3}
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
    comment: Yup.string().required(),
  }),
}

export default withFormik(formikConfig)(PostForm)
