import {UserRepositoryInterface} from '../repositories/interfaces/user_repository_interface'
import {InvalidCredentialsError} from './error/invalid_credentials_error'
import {User} from '@prisma/client'
import {compare} from 'bcryptjs'

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
  }
  interface AuthenticateUseCaseResponse {
    user: User;
  }

  export class AuthenticateUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}
  
    async execute({
      email,
      password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new InvalidCredentialsError();
      const doesPasswordMatches = await compare(password, user.password);
      if (!doesPasswordMatches) throw new InvalidCredentialsError();
      return {
        user,
      };
    }
  }