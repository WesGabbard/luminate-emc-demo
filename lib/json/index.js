export const sendError = (message, params = {}) => ({
  status: 'fail',
  error: {
    message
  },
  ...params
})

export const sendSuccess = (params = {}) => ({
  status: 'success',
  ...params
})
