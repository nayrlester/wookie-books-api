import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";

export default class AuthController {
    
    public async login({ request, auth, response}: HttpContextContract) {
        try{
            const { username, password} = request.only([
                'username',
                'password',
            ])

            const token = await auth.use("api").attempt(username, password, {
                expiresIn: "5 hours",
            });
            
            return token.toJSON();

        }catch(err: any){
            return response.status(401).send({
                message: 'Invalid credentials. Username or password is incorrect.',
                result: '',
                error: true,
            })
        }
    }

    public async register({ request, response }: HttpContextContract) {
        try{
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

        }catch(err: any){
            return response
            .status(401)
            .send({message: err.messages, result: [], error: true})
        }
        
    }

    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').logout()
    
            return response.send({
                message: 'Logout success',
                result: [],
                error: false,
                status: 200,
            })
        } catch (err) {
            return response.status(400).send({ 
                message: err, 
                result: [], 
                error: true
            })
        }
    }
}
