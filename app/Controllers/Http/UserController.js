'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    try {
      const user = await User.create({ ...request.body })
      return response.json(user)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }
}

module.exports = UserController
