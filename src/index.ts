import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prismaClient } from './lib/db';

const PORT = Number(process.env.PORT) || 8000;

async function init() {

    const app = express();
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }

            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey Test GQL server!`
            },

            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }:
                    { firstName: string, lastName: string, email: string, password: string }) => {
                    await prismaClient.user.create({
                        data: {
                            email,
                            firstName,
                            lastName,
                            password,
                            salt: '12'
                        }
                    });
                    return true;
                }
            }
        }
    });

    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({ message: 'Hello World!' });
    });

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(gqlServer))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

init();
