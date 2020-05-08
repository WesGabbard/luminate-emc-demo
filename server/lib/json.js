export const sendError = (message, params = {}) => ({
  error: {
    message
  },
  ...params,
  status: 'fail'
})

export const sendSuccess = (params = {}) => ({
  ...params,
  status: 'success'
})
