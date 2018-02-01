const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-xA-Z0-9]{8,32}$')
      )
    }
    const {error, value} = Joi.validate(req.body, schema)
    console.log('AuthenticationControllerPolicy error value', error)
    console.log('AuthenticationControllerPolicy value value', value)
    console.log(Boolean(error))
    if (error) {
      switch (error.detalis[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'you must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'the passwod provided failed to match the following rules'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration informaion'
          })
      }
    } else {
      next()
    }
  }
}
