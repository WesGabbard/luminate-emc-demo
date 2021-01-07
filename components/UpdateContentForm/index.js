import React, { useState } from 'react'
import { updateContent } from '../../lib/api'
import { Editor } from '@tinymce/tinymce-react'
import Form from 'constructicon/form'
import withForm from 'constructicon/with-form'
import InputField from 'constructicon/input-field'
import * as validators from 'constructicon/lib/validators'

const UpdateContentForm = ({ content, form, onUpdate }) => {
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

  const handleUpdate = content => form.updateValues({ content })

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
      <Editor
        initialValue={content}
        init={{
          height: 200,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={val => handleUpdate(val)}
      />
    </Form>
  )
}

const form = {
  fields: {
    content: {
      label: 'Update Content',
      type: 'hidden',
      validators: [
        validators.required('Add html string for content update')
      ]
    }
  }
}

export default withForm(form)(UpdateContentForm)
