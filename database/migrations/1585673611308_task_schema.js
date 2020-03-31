'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('importance').notNullable()
      table.date('term').notNullable()
      table.integer('user_id').references('id').inTable('users').unique()
      table.timestamps()
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
