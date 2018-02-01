const {User} = require('../models/user')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJson())
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  }
}
