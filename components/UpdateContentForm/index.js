import React, { useState } from 'react'
import { updateContent } from '../../lib/api'
import Form from 'constructicon/form'
import withForm from 'constructicon/with-form'
import InputField from 'constructicon/input-field'
import * as validators from 'constructicon/lib/validators'

const UpdateContentForm = ({
  form,
  onUpdate,
  ...props
}) => {
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(undefined)
  //const [auth, setAuth] = useState(null)
  console.log(props)
  const handleSubmit = e => {
    e.preventDefault()
    return form
      .submit()
      .then(data =>
        Promise.resolve()
          .then(() => setStatus('fetching'))
          .then(() => updateContent(data))
          .then(response => {
            console.log('testresponse', response)
            setStatus(response.status)
            onUpdate(response)
          })
          .catch(error => {
            console.log('test err', error)
            setStatus(error.status)
            setErrors(!error.message ? ['An unexepected error occured'] : [error.message])
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
      <InputField {...form.fields.content} />
    </Form>
  )
}

const form = {
  fields: {
    content: {
      label: 'Content',
      validators: [
        validators.required('Add html string for content update')
      ]
    }
  }
}

export default withForm(form)(UpdateContentForm)
