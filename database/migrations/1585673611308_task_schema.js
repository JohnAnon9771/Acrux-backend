'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments()
      table.string('matter').notNullable()
      table.string('content').notNullable()
      table.string('anotations')
      table.string('importance')
      table.date('term').notNullable()
      table.integer('user_id').references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
