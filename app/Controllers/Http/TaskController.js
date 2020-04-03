'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index({ response, auth }) {
    try {
      const user = await auth.getUser()
      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }
      const tasks = await Task.query().where('user_id', user.id).fetch()
      return response.json(tasks)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }

  async store({ request, response, auth }) {
    try {
      const { matter, content, anotations, importance, term } = request.all()
      const user = await auth.getUser()
      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }

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

  async update({ request, response, params, auth }) {
    try {
      const { id } = params
      const user = await auth.getUser()
      const tasks = await Task.findBy({ id, user_id: user.id })

      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }

      if (!tasks) {
        return response.status(400).json({
          error: { message: 'Usuário não permitido ou tarefa não existente' },
        })
      }

      const data = request.only([
        'matter',
        'content',
        'anotations',
        'importance',
        'term',
      ])

      tasks.merge(data)
      await tasks.save()

      return response.json(tasks)
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }

  async destroy({ response, params, auth }) {
    try {
      const { id } = params
      const user = await auth.getUser()
      const tasks = await Task.query().where({ id, user_id: user.id }).delete()

      if (!user) {
        return response
          .status(401)
          .json({ error: { message: 'Usuário não logado' } })
      }

      if (!tasks) {
        return response.status(400).json({
          error: { message: 'Usuário não permitido ou tarefa não existente' },
        })
      }
      return response.json()
    } catch (error) {
      return response
        .status(500)
        .json({ error: { message: 'Error no servidor!' } })
    }
  }
}

module.exports = TaskController
