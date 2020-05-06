import React, { useState } from 'react'
import axios from "axios";
import Form from 'constructicon/form'
import withForm from 'constructicon/with-form'
import InputField from 'constructicon/input-field'
import * as validators from 'constructicon/lib/validators'

const LoginForm = ({ form, onSuccess }) => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(undefined)

  const handleSubmit = e => {
    e.preventDefault()
    return form
      .submit()
      .then(data =>
        Promise.resolve()
          .then(() => setStatus('fetching'))
          .then(() => axios.get(`http://localhost:3000/api/login?username=${data.username}&password=${data.password}&url=https://fundraising.qa.stjude.org/site/UserLogin`))
          .then(response => setStatus(response.data))
          .catch(error => {
            console.log(error)
            setStatus('failed')
          })
      )
      .catch(error => console.log(error))
  }

  return (
    <Form
      isLoading={status === 'fetching'}
      submit={status === 'fetching' ? 'This may take a minute' : 'Submit'}
      isDisabled={form.invalid}
      onSubmit={handleSubmit}
      noValidate
    >
      <InputField {...form.fields.username} />
      <InputField {...form.fields.password} />
      <div>status = {status}</div>
    </Form>
  )
}

const form = {
  fields: {
    username: {
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
