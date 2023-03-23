import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public cover: string

  @column()
  public image: string

  @column()
  public price: number

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
