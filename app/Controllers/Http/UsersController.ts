import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
  public async index ({response, auth}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const books = await User.all()

      return response
            .status(200)
            .send({message: 'Success', result: books, error: false})
    }catch(err){
      return response
      .status(500)
      .send({message: "There's something wrong in the server. Please contact the admin.", result: err, error: true})
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({response, auth, params}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const books = await User.find(params.id);

      return response
            .status(200)
            .send({message: 'Success', result: books, error: false})

    }catch(err){
      return response
      .status(500)
      .send({message: "There's something wrong in the server. Please contact the admin.", result: err, error: true})
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({response, auth, params}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const user = await User.findOrFail(params.id);
      if(!user){
        return response
          .status(401)
          .send({message:'No record found.', result: '', error: true})
      }
      
      await user.delete();
      return response
            .status(200)
            .send({message: 'User successfully deleted.', result: user, error: false})

    }catch(err){
      return response
      .status(500)
      .send({message: "There's something wrong in the server. Please contact the admin.", result: err, error: true})
    }
  }
}
