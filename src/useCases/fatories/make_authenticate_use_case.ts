import {UserRepository} from '../../repositories/users/user_repository'
import {AuthenticateUseCase} from '../../useCases/authenticate'

export function makeAuthenticateUserUseCase() {
    const userRepository = new UserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    return authenticateUseCase
}