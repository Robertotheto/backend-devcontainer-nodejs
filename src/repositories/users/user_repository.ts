import { Prisma } from '@prisma/client';
import {prisma} from '../../lib/prisma'
import {UserRepositoryInterface} from '../interfaces/user_repository_interface'

export class UserRepository implements UserRepositoryInterface{
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

}