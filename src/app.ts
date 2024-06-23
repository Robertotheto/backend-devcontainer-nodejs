import fastify from 'fastify'
import fastifyJwt from "@fastify/jwt";
import 'dotenv/config'
import {usersRoutes} from './http/controllers/users/routes'

export const app = fastify()

app.get('/', async (request, reply) => {
    return { hello: 'world' }
})
app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: { expiresIn: "10m" },
  });

app.register(usersRoutes, {prefix: '/users'})