import {FastifyRequest, FastifyReply} from 'fastify'
import {makeAuthenticateUserUseCase} from '../../../useCases/fatories/make_authenticate_use_case'
import {InvalidCredentialsError} from '../../../useCases/error/invalid_credentials_error'
import {z} from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUserUseCase()
        const {user} = await authenticateUseCase.execute({email, password})
        const token = await reply.jwtSign(
            {
              sub: user.id,
            }
          )
        return reply.status(200).send({token})
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            reply.status(400).send({
                message: error.message
            })
        }
        throw error
    }
}