'use strict'

class SessionController {
  async store({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)
      return response.json(token)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }
}

module.exports = SessionController
