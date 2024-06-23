import {UserRepositoryInterface} from '../repositories/interfaces/user_repository_interface'
import {User} from '@prisma/client'
import {ResourceNotFoundError} from './error/resource_not_found_error'

interface GetUserProfileUseCaseRequest {
    id: string;
  }
  interface GetUserProfileUseCaseResponse {
    user: User;
  }

  export class GetUserProfileUseCase{
    constructor(private userRepository: UserRepositoryInterface){}
    async execute({id}:GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const user = await this.userRepository.findById(id)
        if(!user) throw new ResourceNotFoundError()
        return {user}
    }
  }