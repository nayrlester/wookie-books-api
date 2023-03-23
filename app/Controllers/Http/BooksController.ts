import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from "App/Models/Book";

export default class BooksController {
  public async index ({response, params}: HttpContextContract) {
    try{
      const books = await Book
                          .query()
                          .where('title', 'LIKE', `%${params.title}%`)
                          .first()

      return response
            .status(200)
            .send({message: 'Success', result: books, error: false})
    }catch(err){
      return response
      .status(500)
      .send({message: "There's something wrong in the server. Please contact the admin.", result: err, error: true})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const books = await Book.find(params.id);

      return response
            .status(200)
            .send({message: 'Success', result: books, error: false})

    }catch(err){
      return response
      .status(500)
      .send({message: "There's something wrong in the server. Please contact the admin.", result: err, error: true})
    }
  }

  public async destroy ({params, response, auth}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const book = await Book.findOrFail(params.id);
      if(!book){
        return response
          .status(401)
          .send({message:'No record found.', result: '', error: true})
      }
      book.status = false
      await book.save();
      return response
          .status(200)
          .send({ message: 'Success', result: book, error: false })

    } catch (err) {
      return response
        .status(500)
        .send({result : err, message: 'There`s something wrong with the server', error: true })
    }
  }
}
