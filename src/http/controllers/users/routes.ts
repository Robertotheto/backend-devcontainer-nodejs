import {FastifyInstance} from 'fastify'
import {register} from './register_user_controller'
import {authenticate} from './authenticate_user_controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/create', register)
  app.post('/login', authenticate)
}