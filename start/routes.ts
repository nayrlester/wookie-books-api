/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  response.redirect().toPath('/docs/index.html')
})

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.post("logout", "AuthController.logout");
  Route.get('search-books/:title', 'BooksController.index')

  Route.group(() => {
    Route.get('users', 'UsersController.index')
    Route.get('user/:id', 'UsersController.show')
    Route.post('user', 'UsersController.create')
    Route.put('user-update/:id', 'UsersController.update')
    Route.delete('user-delete/:id', 'UsersController.destroy')

    Route.post('books', 'BooksController.create')
    Route.get('books/:id', 'BooksController.show')
    Route.put('books-update/:id', 'BooksController.update')
    Route.put('publish-books/:id', 'BooksController.publish')
    Route.delete('unpublish-books/:id', 'BooksController.destroy')
  }).middleware("auth:api");

}).prefix("api");
