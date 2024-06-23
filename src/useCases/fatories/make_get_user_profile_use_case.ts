import {UserRepository} from '../../repositories/users/user_repository'
import {GetUserProfileUseCase} from '../get_user_profile'

export function makeGetUserProfileUseCase(){
    const userRepository = new UserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
    return getUserProfileUseCase
}