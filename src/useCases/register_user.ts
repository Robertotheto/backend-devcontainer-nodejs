import {UserRepositoryInterface} from '../repositories/interfaces/user_repository_interface'
import {User} from '@prisma/client'
import {hash} from 'bcryptjs'
import {UserAlreadyExistsError} from './error/user_already_exists_error'

interface RegisterUserUseCaseRequest{
    name: string,
    email: string,
    password: string
}
interface RegisterUserUseCaseResponse{
    user: User
}

export class RegisterUserUseCase{
    constructor(private userRepository: UserRepositoryInterface){}

    async execute({name,email,password}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>{
        const userAlreadyExists = await this.userRepository.findByEmail(email)
        if(userAlreadyExists){
            throw new UserAlreadyExistsError()
        }
        const hashedPassword = await hash(password, 8)
        const user = await this.userRepository.create({
            name,
            email,
            password:hashedPassword
        })
        return {user}
    }
}