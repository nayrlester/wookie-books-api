import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
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

  public async create({request, response, auth}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const sessionUser = session.$attributes.id
      const { title, description, cover, price} = request.only([
          'title',
          'description',
          'cover',
          'price'
      ])

      const coverImage: any = request.file('image', {
        size: '5mb',
        extnames: ['docx', 'pdf', 'doc', 'xls', 'xlsx', 'csv'],
      })

      if (!coverImage && !coverImage.isValid) {
        return response
          .status(401)
          .send({message:'invalid file.', result: [], error: true})
      }

      const imageFilename = `${coverImage.clientName}` 
      await coverImage.move(Application.tmpPath('uploads'), {
        name: imageFilename,
        overwrite: true,
      })

      const registerSchema = schema.create({
          title: schema.string({}),
      })

      await request.validate({
        schema: registerSchema,
        messages: {
          'title.unique': '{{ field }} is required',
        },
      })

      const books = new Book();
      books.userId = sessionUser;
      books.title = title;
      books.description = description;
      books.cover = cover;
      books.image = imageFilename;
      books.price = price;

      await books.save();
      return response.status(200).send({
          message: "Congratulations!new books successfully created.",
          result: books,
          error: false,
      })
    }catch(err){
      return response
      .status(500)
      .send({message: err.messages, result: err, error: true})
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
