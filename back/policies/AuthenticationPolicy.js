const Joi = require('joi')

module.exports = {
    signup(req, res, next) {
        const schema = {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(
                new RegExp('^[a-xA-Z0-9]{8,32}$')
            ),
            email : Joi.string().email()
        }
        // const {error, value} = Joi.validate(req.body, schema)
        const { error } = Joi.validate(req.body, schema)
        if (error) {
            switch (error.detalis[0].context.key) {
                case 'username':
                    res.send({ success: false, error: 'you must provide a valid username' })
                    break
                case 'password':
                    res.send({ success: false, error: 'the passwod provided failed to match the following rules' })
                    break
                case 'email':
                    res.send({ success: false, error: 'the email provied failed to match the following rules ' })
                default:
                    res.send({ success: false, error: 'Invalid registration informaion' })
            }
        } else {
            next()
        }
    }
}
