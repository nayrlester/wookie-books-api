import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
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
      .send({message: err.messages, result: err, error: true})
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

      const { username, email, fullname, password} = request.only([
          'email',
          'password',
          'username',
          'fullname',
      ])

      const registerSchema = schema.create({
          username: schema.string({}, [
              rules.unique({ table: 'users', column: 'username' })
          ]),
          fullname: schema.string({}),
          email: schema.string({}, [
              rules.email(),
              rules.unique({ table: 'users', column: 'email' })
          ]),
          password: schema.string({ trim: true })
      })

      await request.validate({
          schema: registerSchema,
          messages: {
            'email.unique': '{{ field }} unique validation failure',
            'username.unique': '{{ field }} unique validation failure',
            'fullname.required': '{{ field }} is required',
          },
      })

      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;
      newUser.fullname = fullname;

      await newUser.save();
      return response.status(200).send({
          message: "Congratulations!new user successfully created.",
          result: newUser,
          error: false,
      })
    }catch(err){
      return response
      .status(500)
      .send({message: err.messages, result: err, error: true})
    }
  }

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
      .send({message: err.messages, result: err, error: true})
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({request, response, auth, params}: HttpContextContract) {
    try{
      const session = await auth.use('api').authenticate()
      if(!session){
        return response
          .status(401)
          .send({message:'Your not authorized to access this api.', result: '', error: true})
      }

      const { username, email, fullname, password} = request.only([
          'email',
          'password',
          'username',
          'fullname',
      ])

      const registerSchema = schema.create({
          username: schema.string({}),
          fullname: schema.string({}),
          email: schema.string({}),
          password: schema.string({ trim: true })
      })

      await request.validate({
          schema: registerSchema,
          messages: {
            'email.unique': '{{ field }} is required',
            'username.unique': '{{ field }} is required',
            'fullname.required': '{{ field }} is required',
          },
      })

      const user = await User.findOrFail(params.id);
      user.email = email;
      user.password = password;
      user.username = username;
      user.fullname = fullname;

      await user.save();
      return response.status(200).send({
          message: "Congratulations! User data successfully updated.",
          result: user,
          error: false,
      })

    }catch(err){
      return response
      .status(500)
      .send({message: err.messages, result: err, error: true})
    }
  }

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
      .send({message: err.messages, result: err, error: true})
    }
  }
}
