import React, { useState } from 'react'
import { updateContent } from '../../lib/api'
import Form from 'constructicon/form'
import withForm from 'constructicon/with-form'
import InputField from 'constructicon/input-field'
import * as validators from 'constructicon/lib/validators'

const UpdateContentForm = ({ form, onUpdate }) => {
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState([])
  const handleSubmit = e => {
    e.preventDefault()
    return form
      .submit()
      .then(data =>
        Promise.resolve()
          .then(() => setStatus('fetching'))
          .then(() => updateContent(data))
          .then(response => onUpdate(response))
          .then(() => setStatus('fetched'))
          .catch(error => {
            setStatus('failed')
            setErrors(!error.message ? [{ message: 'An unexepected error occured' }] : [{ message: error.message }])
            return Promise.reject(error)
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
