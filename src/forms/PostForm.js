import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { firstCap } from '../utils/format'
import Input from '../components/UI/Input'
import TextArea from '../components/UI/TextArea'
import Select from '../components/UI/Select'
import Button from '../components/UI/Button'
import Notification from '../components/UI/Notification'

type Props = {
  errors: { [string]: string },
  touched: { [string]: boolean },
  isSubmitting: boolean,
  handleReset: () => mixed,
  status: string,
  categories: Array<{ name: string, path: string }>,
}

const PostForm = (props: Props) => {
  const { errors, touched, isSubmitting, handleReset, status } = props
  return (
    <Form>
      {status && <Notification text={status} />}
      <Field
        component={Select}
        name="category"
        label="Category"
        placeholder="What category does this post belong to?"
        options={props.categories}
        error={touched.category && errors.category && firstCap(errors.category)}
      />
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
        placeholder="Write your post..."
        error={touched.body && errors.body && firstCap(errors.body)}
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
