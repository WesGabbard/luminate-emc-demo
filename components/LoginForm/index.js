import React, { useState } from 'react'
import { login } from '../../lib/api'
import Form from 'constructicon/form'
import withForm from 'constructicon/with-form'
import InputField from 'constructicon/input-field'
import * as validators from 'constructicon/lib/validators'

const LoginForm = ({ auth, form, onSuccess }) => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(undefined)

  const handleSubmit = e => {
    e.preventDefault()
    return form
      .submit()
      .then(data =>
        Promise.resolve()
          .then(() => setStatus('fetching'))
          .then(() => login(auth, data))
          .then(({ data, status }) => {
            setStatus(status)
            return onSuccess(data.loginResponse)
          })
          .catch(error => {
            setStatus('failed')
            setErrors(!error.message ? [{ message: 'An unexepected error occured' }] : [{ message: error.message }])
          })
      )
  }

  return (
    <Form
      errors={errors}
      isLoading={status === 'fetching'}
      submit={status === 'fetching' ? 'This may take a minute' : 'Submit'}
      isDisabled={form.invalid}
      onSubmit={handleSubmit}
      noValidate
    >
      <InputField {...form.fields.user_name} />
      <InputField {...form.fields.password} />
    </Form>
  )
}

const form = {
  fields: {
    user_name: {
      label: 'Username',
      validators: [
        validators.required('Username is a required field'),
      ]
    },
    password: {
      label: 'Password',
      type: 'password',
      validators: [
        validators.required('Password is a required field')
      ]
    }
  }
}

export default withForm(form)(LoginForm)
