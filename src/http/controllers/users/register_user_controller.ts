import {FastifyRequest, FastifyReply} from 'fastify'
import {UserAlreadyExistsError} from '../../../useCases/error/user_already_exists_error'
import {makeRegisterUserUseCase} from '../../../useCases/fatories/make_register_user_use_case'
import {z} from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const{name,email,password} = registerBodySchema.parse(request.body)

  try {
    const registerUseCase =  makeRegisterUserUseCase()
    await registerUseCase.execute({name,email,password})
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({
        message: error.message
    })
    }
    throw error
  }
  return reply.status(201).send()
}