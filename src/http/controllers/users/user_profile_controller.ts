import {makeGetUserProfileUseCase} from '../../../useCases/fatories/make_get_user_profile_use_case'
import {FastifyRequest, FastifyReply} from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply){
    const getUserProfile =  makeGetUserProfileUseCase()
    const {user} = await getUserProfile.execute({
        id : request.user.sub,
    })
    return reply.status(200).send({
        user: {
            ...user,
            password: undefined
        }
    })
}