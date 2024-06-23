import {FastifyInstance} from 'fastify'
import {verifyJwt} from '../../middlewares/verify_jwt'
import {register} from './register_user_controller'
import {authenticate} from './authenticate_user_controller'
import {profile} from './user_profile_controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/create', register)
  app.post('/login', authenticate)

  app.get("/me", { onRequest: [verifyJwt] }, profile)
}