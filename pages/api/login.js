const login = require('server/methods/login');

export default ({ query }, res) => {
  return Promise.resolve()
    .then(() => login(query))
    .then(result =>
      res.json({
        data: result
      })
    )
    .catch(error =>
      res.json({
        error
      })
    )
}

