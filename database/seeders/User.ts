import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.updateOrCreateMany('email', [
      {
        email: 'testuser@email.com',
        password: 'password123',
        username: 'testuser',
        fullname: 'Test User',
      },
      {
        email: 'darthvader@email.com',
        password: 'password123',
        username: 'darthvader',
        fullname: 'Darth Vader',
      },
    ])
  }
}
