'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async store({ request, response, auth }) {
    try {
      const { matter, content, anotations, importance, term } = request.all()
      const user = await auth.getUser()

      const task = await user.tasks().create({
        matter,
        content,
        anotations,
        importance,
        term,
      })

      return response.json(task)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }

  async index({ response, auth }) {
    try {
      const user = await auth.getUser()
      const tasks = await Task.query().where('user_id', user.id).fetch()
      return response.json(tasks)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }
}

module.exports = TaskController
