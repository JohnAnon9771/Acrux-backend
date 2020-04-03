'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('session', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update')
  Route.delete('users', 'UserController.destroy')
}).middleware(['auth'])

Route.group(() => {
  Route.post('task', 'TaskController.store')
  Route.put('task/:id', 'TaskController.update')
  Route.delete('task/:id', 'TaskController.destroy')
  Route.get('task', 'TaskController.index')
}).middleware(['auth'])
