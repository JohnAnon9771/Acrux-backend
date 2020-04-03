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

  async update({ request, response, auth }) {
    try {
      const user = await auth.getUser()
      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }
      const data = request.only(['name', 'email', 'password'])
      user.merge(data)
      await user.save()
      return response.json(user)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }

  async destroy({ response, auth }) {
    try {
      const user = await auth.getUser()
      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }
      await user.delete()
      return response.json()
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }
}

module.exports = UserController
