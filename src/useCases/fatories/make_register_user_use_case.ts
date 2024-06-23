import {UserRepository} from '../../repositories/users/user_repository'
import {RegisterUserUseCase} from '../../useCases/register_user'

export function makeRegisterUserUseCase() {
    const userRepository = new UserRepository()
    const registerUseCase = new RegisterUserUseCase(userRepository)
    return registerUseCase
}