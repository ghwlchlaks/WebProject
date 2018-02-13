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
            console.log('err : ', error)
            switch (error.detalis[0].context.key) {
                case 'username':
                    console.log('vaild username')
                    res.send({ success: false, error: 'you must provide a valid username' })
                    break
                case 'password':
                    console.log('vaild password')
                    res.send({ success: false, error: 'the passwod provided failed to match the following rules' })
                    break
                case 'email':
                    console.log('vaild email')
                    res.send({ success: false, error: 'the email provied failed to match the following rules ' })
                default:
                    console.log('vaild registration information')
                    res.send({ success: false, error: 'Invalid registration informaion' })
            }
        } else {
            next()
        }
    }
}
