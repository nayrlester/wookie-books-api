import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("user_id", 180).notNullable();
      table.string('title', 255).notNullable()
      table.text('description').nullable()
      table.string('cover', 255).nullable()
      table.string('image', 255).notNullable()
      table.boolean('status').defaultTo(false)
      table.double('price', 10,2).notNullable()

      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
